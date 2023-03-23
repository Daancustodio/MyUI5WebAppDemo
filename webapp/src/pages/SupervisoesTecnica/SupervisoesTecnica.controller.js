sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.SupervisoesTecnica.SupervisoesTecnica", {
			onInit : function(){
				console.log("controller [SupervisoesTecnica] Iniciado");
				this.SupervisoesTecnica = this.createLocalRestModel("SupervisoesTecnica.json");
				this.SupervisoesTecnica.get().then(console.log)
				this.setModel(this.SupervisoesTecnica, "SupervisoesTecnica");
			},		

			onAfterRendering :  function(){
				console.log("controller [SupervisoesTecnica] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [SupervisoesTecnica] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [SupervisoesTecnica] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
				this._oNewSupervisoesTecnicaFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.SupervisoesTecnica.SupervisoesTecnica", this);
				this.getView().addDependent(this._oNewSupervisoesTecnicaFragment);
				this._oNewSupervisoesTecnicaFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());

				this._oNewSupervisoesTecnicaFragment.setModel(new RestModel())
				this._oNewSupervisoesTecnicaFragment.open()
			},

			onEditPress(oEvent){
				this._oNewSupervisoesTecnicaFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.SupervisoesTecnica.SupervisoesTecnica", this);
				this.getView().addDependent(this._oNewSupervisoesTecnicaFragment);
				this._oNewSupervisoesTecnicaFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewSupervisoesTecnicaFragment.setModel(selectedObjectModel)
				this._oNewSupervisoesTecnicaFragment.open()

			}

		});
	}
);
