sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.ModalidadesAtencao.ModalidadesAtencao", {
			onInit : function(){
				console.log("controller [ModalidadesAtencao] Iniciado");
				this.ModalidadesAtencao = this.createLocalRestModel("ModalidadesAtencao.json");
				this.ModalidadesAtencao.get().then(console.log)
				this.setModel(this.ModalidadesAtencao, "ModalidadesAtencao"); 
			},		

			onAfterRendering :  function(){
				console.log("controller [ModalidadesAtencao] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [ModalidadesAtencao] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [ModalidadesAtencao] Este método é chamado após a destruição do View associada");
			},	

			onNewPress(oEvent){
                
				this._oNewModalidadesAtencaoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.ModalidadesAtencao.ModalidadesAtencao", this);
				this.getView().addDependent(this._oNewModalidadesAtencaoFragment);
				this._oNewModalidadesAtencaoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());

				this._oNewModalidadesAtencaoFragment.setModel(new RestModel())
				this._oNewModalidadesAtencaoFragment.open()
			},

			onEditPress(oEvent){
				this._oNewModalidadesAtencaoFragment = sap.ui.xmlfragment("MyUI5WebApp.src.pages.ModalidadesAtencao.ModalidadesAtencao", this);
				this.getView().addDependent(this._oNewModalidadesAtencaoFragment);
				this._oNewModalidadesAtencaoFragment.addStyleClass(this.getOwnerComponent().getContentDensityClass());
				
				let selectedRow = oEvent.getSource().getParent().getParent();
				let table = selectedRow.getParent();
				let bindingInfo = table.getBindingInfo("items")
				let selectedObject = selectedRow.getBindingContext(bindingInfo.model).getObject()
				let selectedObjectModel = new RestModel();
				selectedObjectModel.setData(selectedObject)				
				this._oNewModalidadesAtencaoFragment.setModel(selectedObjectModel)
				this._oNewModalidadesAtencaoFragment.open()

			}

		});
	}
);
