sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.Autorizacoes.Autorizacoes", {
			onInit : function(){
				console.log("controller [Autorizacoes] Iniciado");
				this.PerfilUsuario = this.createLocalRestModel("PerfilUsuario.json");
				this.PerfilUsuario.get().then(console.log)
				this.setModel(this.PerfilUsuario, "PerfilUsuario");
				
				this.Autorizacoes = this.createLocalRestModel("Autorizacoes.json");
				this.Autorizacoes.get().then(console.log)
				this.setModel(this.Autorizacoes, "Autorizacoes");
			},		

			onAfterRendering :  function(){
				console.log("controller [Autorizacoes] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [Autorizacoes] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [Autorizacoes] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
                if(!this._oNewAutorizacoesFragment){
					this._oNewAutorizacoesFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.Autorizacoes.Autorizacoes", this);
					this.getView().addDependent(this._oNewAutorizacoesFragment);
					this._oNewAutorizacoesFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}

				this._oNewAutorizacoesFragment.open()

			}

		});
	}
);
