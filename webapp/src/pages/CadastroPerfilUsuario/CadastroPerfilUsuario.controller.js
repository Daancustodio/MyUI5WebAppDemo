sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.CadastroPerfilUsuario.CadastroPerfilUsuario", {
			onInit : function(){
				this.PerfilUsuario = this.createLocalRestModel("PerfilUsuario.json");
				this.PerfilUsuario.get().then(console.log)
				this.setModel(this.PerfilUsuario, "PerfilUsuario");
			},		

			onAfterRendering :  function(){
				console.log("controller [CadastroPerfilUsuario] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [CadastroPerfilUsuario] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [CadastroPerfilUsuario] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
                if(!this._oNewProfileFragment){
					this._oNewProfileFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.CadastroPerfilUsuario.CadastroPerfilUsuario", this);
					this.getView().addDependent(this._oNewProfileFragment);
					this._oNewProfileFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}

				this._oNewProfileFragment.open()

			}

		});
	}
);
