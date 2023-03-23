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

				this.Autorizacoes = this.createLocalRestModel("ArvoreAutorizacaoPerfil.json");
				this.Autorizacoes.get().then(console.log)
				this.setModel(this.Autorizacoes, "Autorizacoes");

				this.AutorizacaoRecursos = this.createLocalRestModel("TipoRecursos.json")
				this.AutorizacaoRecursos.get().then(console.log)
            	this.setModel(this.AutorizacaoRecursos, "AutorizacaoRecursos")

				this.AutorizacoesViewModel = this.createLocalRestModel("AutorizacoeViewModel.json")
				this.AutorizacoesViewModel.get().then(console.log)
				this.setModel(this.AutorizacoesViewModel, 'AutorizacoesViewModel');

				this.SelectedProfileModel = new RestModel();
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
				let selectedRow = oEvent.getSource();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items");
				let selectedObject = oEvent.getSource().getBindingContext(bindingInfo.model).getObject();
				let oTreeTable = this.byId("TreeTable");
	
				selectedRow.setBusy(true);
				oTreeTable.setBusy(true);

				this.SelectedProfileModel.setData(selectedObject)
				this.Autorizacoes
					.get().then(x => {
						oTreeTable.setBusy(false);
						selectedRow.setBusy(false);
						this.getModel("expandPanel").setProperty("/sizeSplitter", "65%");
						this.getModel("expandPanel").setProperty("/visiblePanel", true);
						setTimeout(() => { this.getModel("expandPanel").setProperty("/expanded", true); }, 1000)
	
					})
				this.setModel(this.SelectedProfileModel, "SelectedProfileModel");
				
			},

			onCollapseAll: function () {
				let oTreeTable = this.byId("TreeTable");
				oTreeTable.collapseAll();
			},
	
			onExpandall: function () {
				let oTreeTable = this.byId("TreeTable");
				oTreeTable.expandToLevel(4);
			},
	
			onClosePanel: function (){
				this.getModel("expandPanel").setProperty("/sizeSplitter", "100%");
				this.getModel("expandPanel").setProperty("/expanded", false);
				authorizationChangesList = [];
			},

		});
	}
);
