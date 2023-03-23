sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.CadastroContratos.CadastroContratos", {
			onInit : function(){
				console.log("controller [CadastroContratos] Iniciado");
				this.CadastroContratos = this.createLocalRestModel("CadastroContratos.json");
				this.CadastroContratos.get().then(console.log)
				this.setModel(this.CadastroContratos, "CadastroContratos");
			},		

			onAfterRendering :  function(){
				console.log("controller [CadastroContratos] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [CadastroContratos] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [CadastroContratos] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
                if(!this._oNewCadastroContratosFragment){
					this._oNewCadastroContratosFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.CadastroContratos.CadastroContratos", this);
					this.getView().addDependent(this._oNewCadastroContratosFragment);
					this._oNewCadastroContratosFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}

				this._oNewCadastroContratosFragment.open()

			}

		});
	}
);
