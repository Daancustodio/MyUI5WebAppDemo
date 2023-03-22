sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",	
	"MyUI5WebApp/model/RestModel"
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

				this.AutorizacaoRecursos = this.createLocalRestModel("TipoRecursos.json")
				this.AutorizacaoRecursos.get().then(console.log)
            	this.setModel(this.AutorizacaoRecursos, "AutorizacaoRecursos")
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

			},

			onSelectProfilePress: async function (oEvent) {
				let busyControl = oEvent.getSource();
				let path = oEvent.getSource().getBindingContextPath();
	
				if (!vazia(authorizationChangesList)){
					authorizationChangesList = [];
				} 
	
				let oTreeTable = this.byId("TreeTable");
	
				busyControl.setBusy(true);
				oTreeTable.setBusy(true);
	
				let selectedUser = this.getModel(LIST_MODEL_REF).getProperty(path);
				this.selectedUserModel.setData(selectedUser)
				let pathObterArvore = this.getApiUrl(this.api.USER_AUTHORIZATION_TREE) + "/" + selectedUser.id;
	
				this.autorizacoesUserModel
					.get(pathObterArvore).success(x => {
						oTreeTable.setBusy(false);
						busyControl.setBusy(false);
						//console.log(x);
						originalAuthorizationList = JSON.parse(JSON.stringify(x));
						this.autorizacoesUserModel.setData(x);
						this.getModel("expandPanel").setProperty("/sizeSplitter", "65%");
						this.getModel("expandPanel").setProperty("/visiblePanel", true);
						setTimeout(() => { this.getModel("expandPanel").setProperty("/expanded", true); }, 1000)
	
					}).error((ex) => {
						this.errorMessageReader(ex)
						this.showException(ex);
						busyControl.setBusy(false);
						oTreeTable.setBusy(false);
						this.getModel("expandPanel").setProperty("/sizeSplitter", "100%");
						this.getModel("expandPanel").setProperty("/expanded", false);
						setTimeout(() => { this.getModel("expandPanel").setProperty("/visiblePanel", false) }, 1000)
	
					});
				this.setModel(new JSONModel(selectedUser), "userSelected");
				
			},

		});
	}
);
