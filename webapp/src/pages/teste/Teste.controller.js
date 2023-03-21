sap.ui.define(
	[
	"MyUI5WebApp/src/app/BaseController",		
	"MyUI5WebApp/model/RestModel",
	], 
	function (BaseController, RestModel) {
		"use strict";

		return BaseController.extend("MyUI5WebApp.src.pages.teste.Teste", {
			onInit : function(){
				console.log("controller [Teste] Iniciado");
			},		

			onAfterRendering :  function(){
				console.log("controller [Teste] Renderizado");
			},	

			onBeforeRendering :  function(){
				console.log("controller [Teste] Método chamado antes da Renderização");
			},	

			onExit :  function(){
				console.log("controller [Teste] Este método é chamado após a destruição do View associada");
			},	

		});
	}
);
