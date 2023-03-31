sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.Orcamento.Orcamento", {
			onInit : function(){
				console.log("controller [Orcamento] Iniciado");
				this.Orcamento = this.createLocalRestModel("Orcamento.json");
				this.Orcamento.get().then(console.log)
				this.setModel(this.Orcamento, "Orcamento");
			},		

			onAfterRendering :  function(){
				console.log("controller [Orcamento] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [Orcamento] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [Orcamento] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
				this._oNewOrcamentoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.Orcamento.Orcamento", this);
				this.getView().addDependent(this._oNewOrcamentoFragment);
				this._oNewOrcamentoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());

				this._oNewOrcamentoFragment.setModel(new RestModel())
				this._oNewOrcamentoFragment.open()
			},

			onEditPress(oEvent){
				this._oNewOrcamentoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.Orcamento.Orcamento", this);
				this.getView().addDependent(this._oNewOrcamentoFragment);
				this._oNewOrcamentoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewOrcamentoFragment.setModel(selectedObjectModel)
				this._oNewOrcamentoFragment.open()

			},
			
			onDeletePress(oEvent){
				let messageDeletion = this.getText("Commom.ConfirmDelete")
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let fullMessage = `${messageDeletion} ${selectedObject.Descricao}`;
				MessageBox.confirm(
					fullMessage, {
						icon: MessageBox.Icon.INFORMATION,
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						emphasizedAction: MessageBox.Action.YES,
						onClose: function (oAction) {
							if(oAction == MessageBox.Action.YES){
								MessageBox.alert("Remoção confirmadoa pelo usuário ")
							}
						}
					}
				);

			}

		});
	}
);
