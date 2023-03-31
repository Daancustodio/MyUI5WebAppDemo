sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.CadastroATAs.CadastroATAs", {
			onInit : function(){
				console.log("controller [CadastroATAs] Iniciado");
				this.CadastroATAs = this.createLocalRestModel("CadastroATAs.json");
				this.CadastroATAs.get().then(console.log)
				this.setModel(this.CadastroATAs, "CadastroATAs");
			},		

			onAfterRendering :  function(){
				console.log("controller [CadastroATAs] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [CadastroATAs] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [CadastroATAs] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
				this._oNewCadastroATAsFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.CadastroATAs.CadastroATAs", this);
				this.getView().addDependent(this._oNewCadastroATAsFragment);
				this._oNewCadastroATAsFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());

				this._oNewCadastroATAsFragment.setModel(new RestModel())
				this._oNewCadastroATAsFragment.open()
			},

			onEditPress(oEvent){
				this._oNewCadastroATAsFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.CadastroATAs.CadastroATAs", this);
				this.getView().addDependent(this._oNewCadastroATAsFragment);
				this._oNewCadastroATAsFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewCadastroATAsFragment.setModel(selectedObjectModel)
				this._oNewCadastroATAsFragment.open()

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
