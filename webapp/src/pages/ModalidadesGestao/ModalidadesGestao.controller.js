sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.ModalidadesGestao.ModalidadesGestao", {
			onInit : function(){
				console.log("controller [ModalidadesGestao] Iniciado");
				this.ModalidadesGestao = this.createLocalRestModel("ModalidadesGestao.json");
				this.ModalidadesGestao.get().then(console.log)
				this.setModel(this.ModalidadesGestao, "ModalidadesGestao");
			},		

			onAfterRendering :  function(){
				console.log("controller [ModalidadesGestao] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [ModalidadesGestao] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [ModalidadesGestao] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
                if(!this._oNewModalidadesGestaoFragment){
					this._oNewModalidadesGestaoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.ModalidadesGestao.ModalidadesGestao", this);
					this.getView().addDependent(this._oNewModalidadesGestaoFragment);
					this._oNewModalidadesGestaoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}

				this._oNewModalidadesGestaoFragment.setModel(new RestModel())
				this._oNewModalidadesGestaoFragment.open()
			},

			onEditPress(oEvent){
                if(!this._oNewModalidadesGestaoFragment){
					this._oNewModalidadesGestaoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.ModalidadesGestao.ModalidadesGestao", this);
					this.getView().addDependent(this._oNewModalidadesGestaoFragment);
					this._oNewModalidadesGestaoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				}
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewModalidadesGestaoFragment.setModel(selectedObjectModel)
				this._oNewModalidadesGestaoFragment.open()

			}

		});
	}
);
