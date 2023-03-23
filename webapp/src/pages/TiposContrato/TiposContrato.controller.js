sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.TiposContrato.TiposContrato", {
			onInit : function(){
				console.log("controller [TiposContrato] Iniciado");
				this.TiposContrato = this.createLocalRestModel("TiposContrato.json");
				this.TiposContrato.get().then(console.log)
				this.setModel(this.TiposContrato, "TiposContrato");
			},		

			onAfterRendering :  function(){
				console.log("controller [TiposContrato] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [TiposContrato] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [TiposContrato] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
                if(!this._oNewTiposContratoFragment){
					this._oNewTiposContratoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.TiposContrato.TiposContrato", this);
					this.getView().addDependent(this._oNewTiposContratoFragment);
					this._oNewTiposContratoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}

				this._oNewTiposContratoFragment.setModel(new RestModel())
				this._oNewTiposContratoFragment.open()
			},

			onEditPress(oEvent){
                if(!this._oNewTiposContratoFragment){
					this._oNewTiposContratoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.TiposContrato.TiposContrato", this);
					this.getView().addDependent(this._oNewTiposContratoFragment);
					this._oNewTiposContratoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewTiposContratoFragment.setModel(selectedObjectModel)
				this._oNewTiposContratoFragment.open()

			}

		});
	}
);
