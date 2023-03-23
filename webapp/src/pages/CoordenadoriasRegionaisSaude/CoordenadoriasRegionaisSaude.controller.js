sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.CoordenadoriasRegionaisSaude.CoordenadoriasRegionaisSaude", {
			onInit : function(){
				console.log("controller [CoordenadoriasRegionaisSaude] Iniciado");
				this.CoordenadoriasRegionaisSaude = this.createLocalRestModel("CoordenadoriasRegionaisSaude.json");
				this.CoordenadoriasRegionaisSaude.get().then(console.log)
				this.setModel(this.CoordenadoriasRegionaisSaude, "CoordenadoriasRegionaisSaude");
			},		

			onAfterRendering :  function(){
				console.log("controller [CoordenadoriasRegionaisSaude] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [CoordenadoriasRegionaisSaude] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [CoordenadoriasRegionaisSaude] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
                if(!this._oNewCoordenadoriasRegionaisSaudeFragment){
					this._oNewCoordenadoriasRegionaisSaudeFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.CoordenadoriasRegionaisSaude.CoordenadoriasRegionaisSaude", this);
					this.getView().addDependent(this._oNewCoordenadoriasRegionaisSaudeFragment);
					this._oNewCoordenadoriasRegionaisSaudeFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}

				this._oNewCoordenadoriasRegionaisSaudeFragment.setModel(new RestModel())
				this._oNewCoordenadoriasRegionaisSaudeFragment.open()
			},

			onEditPress(oEvent){
                if(!this._oNewCoordenadoriasRegionaisSaudeFragment){
					this._oNewCoordenadoriasRegionaisSaudeFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.CoordenadoriasRegionaisSaude.CoordenadoriasRegionaisSaude", this);
					this.getView().addDependent(this._oNewCoordenadoriasRegionaisSaudeFragment);
					this._oNewCoordenadoriasRegionaisSaudeFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewCoordenadoriasRegionaisSaudeFragment.setModel(selectedObjectModel)
				this._oNewCoordenadoriasRegionaisSaudeFragment.open()

			}

		});
	}
);
