sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.TiposDespesas.TiposDespesas", {
			onInit : function(){
				console.log("controller [TiposDespesas] Iniciado");
				this.TiposDespesas = this.createLocalRestModel("TiposDespesas.json");
				this.TiposDespesas.get().then(console.log)
				this.setModel(this.TiposDespesas, "TiposDespesas");
			},		

			onAfterRendering :  function(){
				console.log("controller [TiposDespesas] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [TiposDespesas] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [TiposDespesas] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
				this._oNewTiposDespesasFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.TiposDespesas.TiposDespesas", this);
				this.getView().addDependent(this._oNewTiposDespesasFragment);
				this._oNewTiposDespesasFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());

				this._oNewTiposDespesasFragment.setModel(new RestModel())
				this._oNewTiposDespesasFragment.open()
			},

			onEditPress(oEvent){
				this._oNewTiposDespesasFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.TiposDespesas.TiposDespesas", this);
				this.getView().addDependent(this._oNewTiposDespesasFragment);
				this._oNewTiposDespesasFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewTiposDespesasFragment.setModel(selectedObjectModel)
				this._oNewTiposDespesasFragment.open()

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
