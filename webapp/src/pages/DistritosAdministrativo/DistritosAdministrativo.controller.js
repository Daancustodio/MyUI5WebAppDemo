sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.DistritosAdministrativo.DistritosAdministrativo", {
			onInit : function(){
				console.log("controller [DistritosAdministrativo] Iniciado");
				this.DistritosAdministrativo = this.createLocalRestModel("DistritosAdministrativo.json");
				this.DistritosAdministrativo.get().then(console.log)
				this.setModel(this.DistritosAdministrativo, "DistritosAdministrativo");
			},		

			onAfterRendering :  function(){
				console.log("controller [DistritosAdministrativo] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [DistritosAdministrativo] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [DistritosAdministrativo] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
				this._oNewDistritosAdministrativoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.DistritosAdministrativo.DistritosAdministrativo", this);
				this.getView().addDependent(this._oNewDistritosAdministrativoFragment);
				this._oNewDistritosAdministrativoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());

				this._oNewDistritosAdministrativoFragment.setModel(new RestModel())
				this._oNewDistritosAdministrativoFragment.open()
			},

			onEditPress(oEvent){
				this._oNewDistritosAdministrativoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.DistritosAdministrativo.DistritosAdministrativo", this);
				this.getView().addDependent(this._oNewDistritosAdministrativoFragment);
				this._oNewDistritosAdministrativoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewDistritosAdministrativoFragment.setModel(selectedObjectModel)
				this._oNewDistritosAdministrativoFragment.open()

			}

		});
	}
);
