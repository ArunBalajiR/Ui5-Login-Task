sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";
	
		function convert(str){
			var date = new Date(str),
				mnth = ("0" + (date.getMonth() + 1)).slice(-2),
				day = ("0" + date.getDate()).slice(-2);
			return [day,mnth, date.getFullYear()].join(".");
		}

	
	return Controller.extend("EmployeeLoginEmployeeLogin.controller.Login", {
		onInit: function() {
			window.console.log("Initialized");
		},

		onLogin: function() {
			var usn = this.getView().byId("usn").getValue();
			var pwd = this.getView().byId("pwd").getValue();
			//checking whether it is empty or not
			if (usn !== "" || pwd !== "") {
				var surl = "/sap/opu/odata/sap/ZEMPLOYEEPROFILE_SRV/";
				var oModel = new sap.ui.model.odata.ODataModel(surl, true);
				var uri = "Username='" + usn + "',Password='" + pwd + "'";
				window.console.log(uri);
				var id, name, age, gender, designation, experience, doj, salary, status;
				oModel.read("/EMPLOYEESet(" + uri + ")", {
					context: null,
					urlParameters: null,
					async: false,
					success: function(oData, oResponse) {
						status = oResponse["statusCode"];
						id = oData["Empid"];
						name = oData["Name"];
						gender = oData["Gender"];
						age = oData["Age"];
						designation = oData["Designation"];
						experience = oData["Experience"];
						doj = convert(oData["Doj"]);
						salary = oData["Salary"];

					}
				});


				var profile = {
					"empId": id,
					"empName": name,
					"empGender": gender,
					"empAge": age,
					"empDesignation": designation,
					"empExperience": experience,
					"empDoj": doj,
					"empSalary": salary
				};

				var sampleModel = new sap.ui.model.json.JSONModel(profile);
				sap.ui.getCore().setModel(sampleModel, "baseInfo");

				if (status === 200) {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					MessageToast.show("Login Successful !");
					oRouter.navTo("dashboard");

				} else {
					MessageToast.show("Username or Password is incorrect !");
				}

			} else {
				// MessageBox.alert("Please fill all the fields");
				MessageBox.information("Please fill all the fields");
			}

		},

	
		onClear: function() {
			this.getView().byId("usn").setValue("");
			this.getView().byId("pwd").setValue("");

		}
	});
});