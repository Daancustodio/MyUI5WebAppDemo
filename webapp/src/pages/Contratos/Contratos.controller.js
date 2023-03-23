sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.Contratos.Contratos", {
			onInit : function(){
				console.log("controller [Contratos] Iniciado");
				this.Contratos = this.createLocalRestModel("Contratos.json");
				this.Contratos.get().then(console.log)
				this.setModel(this.Contratos, "Contratos");
			},		

			onAfterRendering :  function(){
				console.log("controller [Contratos] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [Contratos] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [Contratos] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
				this._oNewContratosFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.Contratos.Contratos", this);
				this.getView().addDependent(this._oNewContratosFragment);
				this._oNewContratosFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
				this._oNewContratosFragment.setModel(new RestModel())
				this._oNewContratosFragment.open()

			},
			onEditPress(oEvent){
				this._oNewContratosFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.Contratos.Contratos", this);
				this.getView().addDependent(this._oNewContratosFragment);
				this._oNewContratosFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				let table = oEvent.getSource().getParent().getParent().getParent();
				let selectedRow = oEvent.getSource().getParent().getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewContratosFragment.setModel(selectedObjectModel)
				this._oNewContratosFragment.open()

			}

		});
	}
);
