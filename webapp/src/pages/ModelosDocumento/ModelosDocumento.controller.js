sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.ModelosDocumento.ModelosDocumento", {
			onInit : function(){
				console.log("controller [ModelosDocumento] Iniciado");
				this.ModelosDocumento = this.createLocalRestModel("ModelosDocumento.json");
				this.ModelosDocumento.get().then(console.log)
				this.setModel(this.ModelosDocumento, "ModelosDocumento");
			},		

			onAfterRendering :  function(){
				console.log("controller [ModelosDocumento] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [ModelosDocumento] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [ModelosDocumento] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
				this._oNewModelosDocumentoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.ModelosDocumento.ModelosDocumento", this);
				this.getView().addDependent(this._oNewModelosDocumentoFragment);
				this._oNewModelosDocumentoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());

				this._oNewModelosDocumentoFragment.setModel(new RestModel())
				this._oNewModelosDocumentoFragment.open()
			},

			onEditPress(oEvent){
				this._oNewModelosDocumentoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.ModelosDocumento.ModelosDocumento", this);
				this.getView().addDependent(this._oNewModelosDocumentoFragment);
				this._oNewModelosDocumentoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewModelosDocumentoFragment.setModel(selectedObjectModel)
				this._oNewModelosDocumentoFragment.open()

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
