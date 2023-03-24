sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.Cadastros.Cadastros", {
			onInit : function(){
				console.log("controller [Cadastros] Iniciado");
				this.Cadastros = this.createLocalRestModel("Cadastros.json");
				this.Cadastros.get().then(console.log)
				this.setModel(this.Cadastros, "Cadastros");
			},		

			onAfterRendering :  function(){
				console.log("controller [Cadastros] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [Cadastros] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [Cadastros] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
                if(!this._oNewCadastrosFragment){
					this._oNewCadastrosFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.Cadastros.Cadastros", this);
					this.getView().addDependent(this._oNewCadastrosFragment);
					this._oNewCadastrosFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}

				this._oNewCadastrosFragment.setModel(new RestModel())
				this._oNewCadastrosFragment.open()
			},

			onEditPress(oEvent){
                if(!this._oNewCadastrosFragment){
					this._oNewCadastrosFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.Cadastros.Cadastros", this);
					this.getView().addDependent(this._oNewCadastrosFragment);
					this._oNewCadastrosFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewCadastrosFragment.setModel(selectedObjectModel)
				this._oNewCadastrosFragment.open()

			}

		});
	}
);
