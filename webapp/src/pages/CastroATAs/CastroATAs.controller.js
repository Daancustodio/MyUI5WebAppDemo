sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.CastroATAs.CastroATAs", {
			onInit : function(){
				console.log("controller [CastroATAs] Iniciado");
				this.CastroATAs = this.createLocalRestModel("CastroATAs.json");
				this.CastroATAs.get().then(console.log)
				this.setModel(this.CastroATAs, "CastroATAs");
			},		

			onAfterRendering :  function(){
				console.log("controller [CastroATAs] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [CastroATAs] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [CastroATAs] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
				this._oNewCastroATAsFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.CastroATAs.CastroATAs", this);
				this.getView().addDependent(this._oNewCastroATAsFragment);
				this._oNewCastroATAsFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());

				this._oNewCastroATAsFragment.setModel(new RestModel())
				this._oNewCastroATAsFragment.open()
			},

			onEditPress(oEvent){
				this._oNewCastroATAsFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.CastroATAs.CastroATAs", this);
				this.getView().addDependent(this._oNewCastroATAsFragment);
				this._oNewCastroATAsFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewCastroATAsFragment.setModel(selectedObjectModel)
				this._oNewCastroATAsFragment.open()

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
