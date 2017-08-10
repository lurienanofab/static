(function ($) {
    $.fn.assignaccounts = function (options) {
        return this.each(function () {
            var $this = $(this);

            var defopt = { "init": null };
            var o = $.extend({}, defopt, options);

            if (!$this.hasClass("assignaccounts"))
                $this.addClass("assignaccounts");

            var config = {
                AjaxURL: $(".AjaxURL", $this).val()
            };

            var settings = {
                Data: {
                    Command: null,
                    OrgID: null,
                    ManagerClientOrgID: null
                },
                Save: function () {
                    $(".Command", $this).val(this.Data.Command);
                    $(".OrgID", $this).val(this.Data.OrgID);
                    $(".ManagerClientOrgID", $this).val(this.Data.ManagerClientOrgID)
                },
                Refresh: function () {
                    this.Data.Command = $(".Command", $this).val();
                    this.Data.OrgID = $(".OrgID", $this).val();
                    this.Data.ManagerClientOrgID = $(".ManagerClientOrgID", $this).val();
                }
            };

            settings.Refresh();

            var updateManagers = function (orgId, complete) {
                settings.Data.Command = "get-managers";
                settings.Data.OrgID = orgId;
                settings.Save();

                $(".message", $this).html("");

                if (!settings.Data.OrgID) {
                    $(".message").append($("<div/>", { "class": "alert alert-danger", "role": "alert" }).html("OrgID is missing!"));
                    return false;
                }

                $(".managers .manager-select", $this).hide();
                $(".managers .working", $this).show();
                $(".matrix-container", $this).hide();
                $(".matrix-working", $this).hide();
                $(".edit-items", $this).html("");
                $(".edit-items-control", $this).hide();

                $.ajax({
                    "url": config.AjaxURL,
                    "type": "POST",
                    "dataType": "json",
                    "data": settings.Data
                }).done(function (data, textStatus, jqXHR) {
                    var select = $(".managers .manager-select", $this);

                    $("option", select).remove();

                    select.append($("<option/>", { "value": "0" }).html("-- Select --"));

                    $.each(data.managers, function (index, item) {
                        select.append($("<option/>", { "value": item.ClientOrgID }).html(item.DisplayName));
                    });

                    select.show();

                    var managerClientOrgId = parseInt(settings.Data.ManagerClientOrgID);

                    if (managerClientOrgId) {
                        select.val(managerClientOrgId)
                        updateMatrix(managerClientOrgId);
                    }
                    else
                        select.prop("selectedIndex", 0);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    errorPopup(jqXHR.responseText);
                }).always(function () {
                    $(".managers .working", $this).hide();
                    if (typeof complete == "function") complete()
                });
            };

            var setAcctDisplay = function (key) {
                switch (key) {
                    case "name":
                        $(".acct-name", $this).show();
                        $(".acct-number", $this).hide();
                        $(".acct-project", $this).hide();
                        $(".acct-shortcode", $this).hide();
                        break;
                    case "number":
                        $(".acct-name", $this).hide();
                        $(".acct-number", $this).show();
                        $(".acct-project", $this).hide();
                        $(".acct-shortcode", $this).hide();
                        break;
                    case "project":
                        $(".acct-name", $this).hide();
                        $(".acct-number", $this).hide();
                        $(".acct-project", $this).show();
                        $(".acct-shortcode", $this).hide();
                        break;
                    case "shortcode":
                        $(".acct-name", $this).hide();
                        $(".acct-number", $this).hide();
                        $(".acct-project", $this).hide();
                        $(".acct-shortcode", $this).show();
                        break;
                }
            }

            var filterMatrix = function (key) {
                $(".user-column", $this).hide();
                $(".user-column." + key, $this).show();
            };

            var acctDisplayBy = function () {
                return $(".acct-display-by:checked", $this);
            }

            var updateMatrix = function (managerClientOrgId) {
                $(".matrix-container", $this).hide();

                if (managerClientOrgId == 0) return;

                settings.Data.Command = "update-matrix";
                settings.Data.ManagerClientOrgID = managerClientOrgId;
                settings.Save();

                $(".message", $this).html("");

                if (!settings.Data.OrgID) {
                    $(".message").append($("<div/>", { "class": "alert alert-danger", "role": "alert" }).html("OrgID is missing!"));
                    return false;
                }

                if (!settings.Data.ManagerClientOrgID) {
                    $(".message").append($("<div/>", { "class": "alert alert-danger", "role": "alert" }).html("ManagerClientOrgID is missing!"));
                    return false;
                }

                $(".matrix-working", $this).show();
                $(".edit-items", $this).html("");
                $(".edit-items-control", $this).hide();

                $.ajax({
                    "url": config.AjaxURL,
                    "type": "POST",
                    "dataType": "json",
                    "data": settings.Data
                }).done(function (data, textStatus, jqXHR) {
                    $(".matrix-table-container", $this).html(data.matrix);
                    $(".matrix-filter", $this).html(data.filter);
                    setAcctDisplay(acctDisplayBy().data("key"));
                    filterMatrix("opt-group-0");
                    $(".matrix-container", $this).show();
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    errorPopup(jqXHR.responseText);
                }).always(function () {
                    $(".matrix-working", $this).hide();
                });
            };

            var errorPopup = function (error) {
                var popup = $("<div/>", { "class": "popup" })
                    .append($("<div/>").html($("<strong/>").html("Server Error"))
                        .css({ "border-bottom": "solid 2px #d0d0d0", "padding": "5px", "background-color": "#eeeeff" })
                        .append($('<div style="float: right; cursor">[<a href="#" class="close-link">x</a>]</div>').on("click", ".close-link", function (e) {
                            e.preventDefault();
                            popup.hide("slow", function () {
                                popup.empty().remove();
                            });
                        }))
                    ).append($("<div/>", { "class": "errwin" })
                        .css({ "width": "900px", "height": "500px" })
                        .append($('<iframe class="errframe"></iframe>')
                            .css({ "width": "100%", "height": "500px" })
                            .attr("frameborder", "0"))
                    ).css({ "display": "none", "z-index": "9999", "position": "absolute", "border": "solid 1px #808080", "box-shadow": "2px 2px 4px #808080", "background-color": "#FFFFFF" })
                    .prependTo("body");
                var ifrm = $(".errframe", popup);
                ifrm.load(function () {
                    var doc = ifrm.contents()[0];
                    doc.clear();
                    doc.open();
                    doc.write(error);
                    doc.close();
                    popup.css({
                        "top": Math.max((($(window).height() - popup.outerHeight()) / 2) + $(window).scrollTop(), 0) + "px",
                        "left": Math.max((($(window).width() - popup.outerWidth()) / 2) + $(window).scrollLeft(), 0) + "px"
                    }).show("slow");
                });
            };

            var toggleEditItemsControl = function () {
                if ($(".edit-items .edit-item", $this).length > 0)
                    $(".edit-items-control", $this).show();
                else
                    $(".edit-items-control", $this).hide();
            }

            var createEditItem = function (checkbox) {
                var row = checkbox.closest("tr");
                var chk = checkbox.is(":checked");
                var accountId = row.data("account-id");
                var accountName = $(".acct-name", row).html();
                var clientOrgId = checkbox.data("client-org-id");
                var displayName = checkbox.data("display-name");
                var email = checkbox.data("email");
                var warningMessage = checkbox.data("warning-message");
                var addItem = true;

                //see if the checked user/account is already in the edit list
                $(".edit-items .edit-item", $this).each(function () {
                    if ($(this).data("account-id") == accountId && $(this).data("client-org-id") == clientOrgId) {
                        $(this).remove();
                        addItem = false;
                    }
                });

                if (addItem) {
                    var editItem = $("<div/>", { "class": "edit-item" })
                        .attr("data-action", chk ? "add" : "remove")
                        .attr("data-account-id", accountId)
                        .attr("data-client-org-id", clientOrgId)
                        .append(
                            $("<table/>").append($("<tbody/>")
                                .append($("<tr/>")
                                    .append($("<th/>").html("Action:"))
                                    .append($("<td/>").html(chk ? "Add" : "Remove"))
                                ).append($("<tr/>")
                                    .append($("<th/>").html("Client:"))
                                    .append($("<td/>").html(displayName))
                                ).append($("<tr/>")
                                    .append($("<th/>").html("Email:"))
                                    .append($("<td/>").html(
                                        $("<a/>", { "href": "mailto:" + email + "?subject=Regarding your LNF Drybox reservation" }).html(email)
                                    ))
                                ).append($("<tr/>")
                                    .append($("<th/>").html("Account:"))
                                    .append($("<td/>").html(accountName))
                                ).append($("<tr/>", { "class": "warning-message-row" })
                                    .append($("<td/>", { "colspan": "2" }).html(warningMessage))
                                ).append($("<tr/>")
                                    .append($("<td/>", { "colspan": "2" }).append(
                                        $("<div/>", { "class": "edit-item-control" })
                                            .append($("<a/>", { "href": "#", "class": "save-link" }).html("Save"))
                                            .append(" | ")
                                            .append($("<a/>", { "href": "#", "class": "cancel-link" }).html("Cancel"))
                                    ).append(
                                        $("<div/>", { "class": "edit-item-working" }).css("display", "none").html(
                                            $("<em/>", { "class": "working" }).html("Working...")
                                        )
                                    ).append(
                                        $("<div/>", { "class": "edit-item-message" }).css("display", "none")
                                    ))
                                ))
                        ).on("click", ".save-link", function (e) {
                            e.preventDefault();
                            var parent = $(this).closest(".edit-item");
                            parent.find(".edit-item-message").html("");
                            parent.find(".edit-item-control").hide();
                            parent.find(".edit-item-working").show();

                            setTimeout(function () {

                                $.ajax({
                                    "url": config.AjaxURL,
                                    "type": "POST",
                                    "dataType": "json",
                                    "data": {
                                        "Command": "update-client-account",
                                        "Action": chk ? "add" : "remove",
                                        "OrgID": settings.Data.OrgID,
                                        "ManagerClientOrgID": settings.Data.ManagerClientOrgID,
                                        "UserClientOrgID": clientOrgId,
                                        "AccountID": accountId
                                    }
                                }).done(function (data, textStatus, jqXHR) {
                                    parent.remove();
                                    toggleEditItemsControl();
                                }).fail(function (jqXHR, textStatus, errorThrown) {
                                    parent.find(".edit-item-working").hide();
                                    parent.find(".edit-item-control").show();
                                    errorPopup(jqXHR.responseText);
                                });

                            }, 1000);

                        }).on("click", ".cancel-link", function (e) {
                            e.preventDefault();
                            var parent = $(this).closest(".edit-item");
                            var action = parent.data("action");
                            if (action == "add")
                                checkbox.prop("checked", false);
                            else
                                checkbox.prop("checked", true);
                            parent.remove();
                            toggleEditItemsControl();
                        }).appendTo(".edit-items", $this);

                    if (!warningMessage)
                        $("tr.warning-message-row", editItem).hide();
                }

                toggleEditItemsControl();
            };

            var activeCells = {
                "target": null,
                "row": null,
                "column": null,
                "colHeader": null,
                "rowHeader": null,
                "select": function (targ) {
                    var row = targ.parent();
                    var cindex = row.children().index(targ);
                    this.target = targ;
                    this.row = row.find("td.user-column");
                    this.column = row.parent().find("tr td.col-" + cindex);
                    this.rowHeader = row.find("th").eq(0);
                    this.colHeader = row.parent().find("tr th").eq(cindex);
                    this.colHeader.addClass("column-header-active");
                    this.rowHeader.addClass("row-header-active");
                    this.column.addClass("column-active");
                    this.row.addClass("row-active");
                    this.target.addClass("target-active");
                },
                "clear": function () {
                    if (this.row) this.row.removeClass("row-active");
                    if (this.column) this.column.removeClass("column-active");
                    if (this.rowHeader) this.rowHeader.removeClass("row-header-active");
                    if (this.colHeader) this.colHeader.removeClass("column-header-active");
                    if (this.target) this.target.removeClass("target-active");
                    this.row = null;
                    this.column = null;
                    this.rowHeader = null;
                    this.colHeader = null;
                    this.target = null;
                }
            };

            $this.on("change", ".manager-select", function (e) {
                updateMatrix($(e.currentTarget).val());
            }).on("change", ".acct-display-by", function (event) {
                var key = $(event.currentTarget).data("key");
                setAcctDisplay(key);
            }).on("change", ".matrix-filter", function (event) {
                filterMatrix($(event.currentTarget).find("option:selected").val());
            }).on("click", ".user-account-checkbox", function (event) {
                var target = $(event.currentTarget);
                createEditItem(target);
            }).on("click", ".edit-items-save-button", function (event) {
                $(".edit-items .edit-item .save-link", $this).each(function () {
                    $(this).click();
                });
            }).on("click", ".edit-items-cancel-button", function (event) {
                $(".edit-items .edit-item .cancel-link", $this).each(function () {
                    $(this).click();
                });
            }).on("mouseover", "td.user-column", function (event) {
                activeCells.select($(event.currentTarget));
            }).on("mouseout", "td.user-column", function (event) {
                activeCells.clear();
            });

            $this.Config = config;
            $this.Settings = settings;
            $this.UpdateManagers = updateManagers;
            $this.UpdateMatrix = updateMatrix;

            setAcctDisplay(acctDisplayBy().data("key"));

            if (typeof o.init == "function") {
                o.init($this);
            }
        });
    }
}(jQuery));