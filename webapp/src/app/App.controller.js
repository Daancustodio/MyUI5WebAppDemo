

sap.ui.define(
	[
		"MyUI5WebApp/src/app/BaseController",
		"sap/m/MessageToast",
		"MyUI5WebApp/model/RestModel",
		"MyUI5WebApp/model/formatter"
	],
	function (BaseController, MessageToast, RestModel, formatter) {
	"use strict";

	return BaseController.extend("MyUI5WebApp.src.app.App", {
		fmt:formatter,
		_toolPage:{},
		onInit : function(){
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			this._toolPage = this.byId("tooApplPage");
			this
            .getRouter()
            .attachRouteMatched(this.onAfterLoginMatch, this);
			this
            .getRouter()
            .getRoute('login')
            .attachPatternMatched(this.beforeLogin, this);
		},
		beforeLogin(oEvent){
			this.destroyNavigation();
		},
		onAfterLoginMatch(oEvent){
			let route = oEvent.getParameter("name");
			if(route != "login")
				this.createNavigation();
		},

		onLoginPopOver : function(oEvent){
			if(!this.getUserSession()){
				MessageToast.show(this.getText("Commom.NoLoggedUser"));
				this.getRouter().navTo('login');
			}
			else
				this.loggedPopOver(oEvent);
		},

		onLogOut : function (){
			this.destroyUserSession();
			this.getRouter().navTo("login");
			location.reload()
		},

		loggedPopOver : function(oEvent){

			if (!this._oPopoverLogged) {
			    this._oPopoverLogged = sap.ui.xmlfragment("MyUI5WebApp.src.pages.security.Logged", this);
			    this.getView().addDependent(this._oPopoverLogged);
			}
			let model = new RestModel();
			model.setData(this.getUserSession())
			this._oPopoverLogged.setModel(model);
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function () {
			    this._oPopoverLogged.openBy(oButton);
			});
		},

		createNavigation(){
			let toogleButton = this.byId("sideNavigationToggleButton");
			if(toogleButton.getEnabled()) return;

			var model = this.createLocalRestModel("AppModel.json")
			model.get()
			.then(() =>{
				/* model.getData().navigation.forEach(element => {
					element.items.sort(this.sortingCriteria('title'))
				}) */
				this._toolPage.setSideContent(this.getSideContentTemplate(model.getData()))
			})
			toogleButton.setEnabled(true);
			//this.getModel("AppMenuModel").setProperty("/enableMenu", true);
			this._toolPage.setModel(model)
		},

		destroyNavigation(){
			this.byId("sideNavigationToggleButton").setEnabled(false);
			this._toolPage.setModel(new RestModel());
		},

		onSideNavButtonPress : function() {
			var sideExpanded = this._toolPage.getSideExpanded();
			this._toolPage.setSideExpanded(!sideExpanded);
		},
		onNavRoute:function(oEvent){
			var item = oEvent.getParameter('item');
			let key = item.getKey();
			this._toolPage.setSideExpanded(false);
            this.getRouter().navTo(key);
		},

		getSideContentTemplate(menudata) {
			let side = new sap.tnt.SideNavigation();
			this.navigationList = new sap.tnt.NavigationList();
			let itemsFixed = new sap.tnt.NavigationList();
			let that = this;
			const createMenu = (menu, navigationList) => {
				let translatedTitle = this.getText(menu.title)
				let menuListItem = new sap.tnt.NavigationListItem(
					{
						select: (item) => {
							that.onNavRoute(item)
						},
						text: translatedTitle,
						icon: menu.icon,
						expanded: menu.expanded,
						key: menu.key,
					}
				);

				if (!menu.items) {
					navigationList.addItem(menuListItem);
					return;
				}
				menu.items.forEach(x => {
					let translatedTitle = this.getText(x.title)

					let menuSubItem = new sap.tnt.NavigationListItem(
						{
							select: (item) => {
								that.onNavRoute(item)
							},
							text: translatedTitle,
							icon: x.icon,
							key: x.key
						}
					);
					menuListItem.addItem(menuSubItem);
				});

				navigationList.addItem(menuListItem);
			}
			menudata.navigation.forEach(menu => createMenu(menu, this.navigationList));
			menudata.fixedNavigation.forEach(menu => createMenu(menu, itemsFixed));

			side.setItem(this.navigationList);
			side.setFixedItem(itemsFixed);
			return side;
		},
	});
});
