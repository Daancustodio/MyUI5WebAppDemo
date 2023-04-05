sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	"sap/m/MessageBox"
	], 
	function (BaseController, RestModel, MessageBox) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.Usuarios.Usuarios", {
			onInit : function(){
				console.log("controller [Usuarios] Iniciado");
				this.Usuarios = this.createLocalRestModel("Usuarios.json");
				this.Usuarios.get().then(console.log)
				this.setModel(this.Usuarios, "Usuarios");
			},		

			onAfterRendering :  function(){
				console.log("controller [Usuarios] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [Usuarios] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [Usuarios] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
				this._oNewUsuariosFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.Usuarios.Usuarios", this);
				this.getView().addDependent(this._oNewUsuariosFragment);
				this._oNewUsuariosFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());

				this._oNewUsuariosFragment.setModel(new RestModel())
				this._oNewUsuariosFragment.open()
			},

			onEditPress(oEvent){
				this._oNewUsuariosFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.Usuarios.Usuarios", this);
				this.getView().addDependent(this._oNewUsuariosFragment);
				this._oNewUsuariosFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewUsuariosFragment.setModel(selectedObjectModel)
				this._oNewUsuariosFragment.open()

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
