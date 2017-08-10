function InventoryClient() {
    this.getInventoryTypes = function () {
        return $.ajax({
            "url": "/webapi/inventory/inventory-type",
            "type": "GET"
        });
    }
}