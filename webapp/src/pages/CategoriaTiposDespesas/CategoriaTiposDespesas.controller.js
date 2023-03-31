sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.CategoriaTiposDespesas.CategoriaTiposDespesas", {
			onInit : function(){
				console.log("controller [CategoriaTiposDespesas] Iniciado");
				this.CategoriaTiposDespesas = this.createLocalRestModel("CategoriaTiposDespesas.json");
				this.CategoriaTiposDespesas.get().then(console.log)
				this.setModel(this.CategoriaTiposDespesas, "CategoriaTiposDespesas");
			},		

			onAfterRendering :  function(){
				console.log("controller [CategoriaTiposDespesas] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [CategoriaTiposDespesas] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [CategoriaTiposDespesas] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
				this._oNewCategoriaTiposDespesasFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.CategoriaTiposDespesas.CategoriaTiposDespesas", this);
				this.getView().addDependent(this._oNewCategoriaTiposDespesasFragment);
				this._oNewCategoriaTiposDespesasFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());

				this._oNewCategoriaTiposDespesasFragment.setModel(new RestModel())
				this._oNewCategoriaTiposDespesasFragment.open()
			},

			onEditPress(oEvent){
				this._oNewCategoriaTiposDespesasFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.CategoriaTiposDespesas.CategoriaTiposDespesas", this);
				this.getView().addDependent(this._oNewCategoriaTiposDespesasFragment);
				this._oNewCategoriaTiposDespesasFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewCategoriaTiposDespesasFragment.setModel(selectedObjectModel)
				this._oNewCategoriaTiposDespesasFragment.open()

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
