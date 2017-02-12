// \u00E5 = ? \u00C5   \u00E6 = ? \u00C6   \u00F8 = ? \u00D8
$(function() {
	
	var Afgifter = {
		
		"Intervals":{
			"Personbil-Benzin":{
				"Type":"LessThan",
				"Interval":[4.5,4.8,5,5.3,5.6,5.9,6.3,6.7,7.1,7.7,8.3,9.1,10,10.5,11.1,11.8,12.5,13.3,14.3,15.4,16.7,18.2,20]
			},
			"Personbil-Diesel":{
				"Type":"LessThan",
				"Interval":[5.1,5.4,5.6,5.9,6.2,6.6,7,7.5,8.1,8.7,9.4,10.2,11.3,11.9,12.5,13.2,14.1,15,16.1,17.3,18.8,20.5,22.5,25,28.1,32.1]
			},
			"Koretoj-Vagtafgiftsloven":[600,800,1100,1300,1500,2000],
			"VareBil+Trailer":[500,1000,2000,2500,3000,4000],
			"LastBil-1":[12999,13999,14999],
			"LastBil-2":[16999,18999,20999,22999],
			"LastBil-3":[24999,25999,28999],	
			"LastBil-4":[15999,17999,19999,21999,22999,24999],
			"LastBil-5":[24999,25999,27999,28999,30999,32999],
			"LastBil-6":[37999,39999],
			"LastBil-7":[37999],
			"LastBil-8":[4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000],
			"LastBil-9":[18000,19000,20000],
			"Bus":[1300,1500,2000,3000,4000,5000,6000,7000,8000,9000],
			"Taxa":[800,1100,1300,1500,2000],
			"NoIntervals":[],
			"Camper":[600,800,1100,1300,1500,2000]
		},
		"km-liter-lov":{	
			"Normal":{
				"2014":[10080,9530,8990,8450,7910,7350,6810,6270,5720,5180,4640,4100,3540,3010,2730,2460,2190,1920,1650,1380,1110,830,560,290,0,0,0],
				"2015":[10830,10230,9650,9080,8500,7890,7310,6730,6140,5560,4980,4400,3800,3230,2930,2640,2350,2060,1770,1480,1190,890,600,310,0,0,0],
				"Years":{
					"2015":[2016]
				},
				"Period":2,
				"Interval-key":"Personbil-Benzin"
			},
			"Udligning":{					
				"2014":[5100,4880,4590,4370,4120,3920,3730,3470,3260,3080,2840,2640,2420,2190,2100,2000,1870,1760,1640,1530,1430,1310,1220,1110,1020,570,120],
				"2015":[5190,4960,4670,4450,4200,3990,3790,3530,3320,3140,2890,2680,2470,2230,2130,2030,1910,1790,1670,1550,1450,1340,1240,1130,1040,580,120],
				"2016":[5240,5000,4710,4490,4240,4030,3830,3560,3350,3170,2920,2710,2490,2250,2150,2050,1930,1810,1690,1570,1470,1360,1250,1140,1050,590,130],
				"Period":2,
				"Interval-key":"Personbil-Diesel"
			}		
		}, 
		"Vagtafgift-lov":{
			"Normal":{	
				"2014":[930,1140,1550,2060,[1360,2690],[1860,3710],{"sats":105,"pr":100}],
				"2015":[1000,1220,1660,2210,[1460,2890],[2000,3980],{"sats":113,"pr":100}],
				"Years":{
					"2015":[2016]
				},	
				"Period":[2,2,2,2,2,2,4],
				"Interval-key":"Koretoj-Vagtafgiftsloven"

			},
			"Udligning":{
				"2014":[740,930,1220,1550,990,1320,{"sats":74,"pr":100}],
				"2015":[760,940,1240,1580,1010,1350,{"sats":76,"pr":100}],
				"2016":[770,950,1250,1600,1020,1370,{"sats":77,"pr":100}],
				"Period":[2,2,2,2,4,4,4],
				"Interval-key":"Koretoj-Vagtafgiftsloven"
			}		
		},
		"Varebil":{
			"Normal":{
				"2014":[930,1190,1980,3430,4110,4110,false],
				"2015":[1000,1280,2130,3680,4410,4410,false],
				"Years":{
					"2015":[2016]
				},	
				"Interval-key":"VareBil+Trailer",
				"Period":1
			},
			"Udligning":{
				"2014":[560,800,1100,1370,1560,1770,false],
				"2015":[570,820,1120,1400,1590,1800,false],
				"2016":[580,830,1130,1420,1610,1820,false],	
				"Interval-key":"VareBil+Trailer",
				"Period":1
			},
			"PrivatAnvendelse_before2007":{
				"2014":[990,990,990,5510,5510,5510],
				"2015":[1060,1060,1060,5920,5920,5920],
				"Years":{
					"2015":[2016]
				}
			},
			"PrivatAnvendelse_after2007":{
				"2014":[5510,5510,5510,5510,5510,16380],
				"2015":[5920,5920,5920,5920,5920,17590],
				"Years":{
					"2015":[2016]
				}
			},
			"PrivatAnvendelse_before1998":{
				"2014":[0,0,0,0,0,0],
				"Years":{
					"2014":[2015,2016]
				}	
			},
			"PrivatAnvendelse-kml-lov":{
				"Under3001":{
					"2014":2755,
					"2015":2960,
					"Years":{
						"2015":[2016]
					}
				},
				"Over3001":{
					"2014":8190,
					"2015":8795,
					"Years":{
						"2015":[2016]
					}					
				}
			}
		},
		"LastBil":{
			"InklusivAfgift":{
				"Lastbil":{
					"Aksler-2":{
						"Interval-key":"LastBil-1",
						"Luft":{
							"2014":[0,226,627,882],
							"Years":{
								"2014":[2015,2106]
							}	
						},
						"Anden":{
							"2014":[226,627,882,2050],
							"Years":{
								"2014":[2015,2016]
							}	
						}
					},
					"Aksler-3":{
						"Interval-key":"LastBil-2",
						"Luft":{
							"2014":[226,394,809,1050,1661],
							"Years":{
								"2014":[2015,2016]
							}	
						},
						"Anden":{
							"2014":[394,809,1050,1661,2582],
							"Years":{
								"2014":[2015,2016]
							}	
						}
					},
					"Aksler-4":{
						"Interval-key":"LastBil-3",
						"Luft":{
							"2014":[1050,1065,1706,2709],
							"Years":{
								"2014":[2015,2016]
							}	
						},
						"Anden":{
							"2014":[1065,1706,2709,4019],
							"Years":{
								"2014":[2015,2016]
							}	
						}
					}
				},
				"Vogntog":{
					"Aksler-2":{
						"AkslerVogntog-1":{
							"Interval-key":"LastBil-4",	
							"Luft":{
								"2014":[false,false,102,233,547,707,1276],
								"Years":{
									"2014":[2015,2016]
								}	
							},
							"Anden":{
								"2014":[false,102,233,547,707,1276,2297],
								"Years":{
									"2014":[2015,2016]
								}	
							}
						},
						"AkslerVogntog-2":{
							"Interval-key":"LastBil-5",	
							"Luft":{
								"2014":[219,510,839,1232,1526,2507,3480],
								"Years":{
									"2014":[2015,2016]
								}	
							},
							"Anden":{
								"2014":[510,839,1232,1526,2507,3480,5284],
								"Years":{
									"2014":[2015,2016]
								}	
							}
						},
						"AkslerVogntog-3":{
							"Interval-key":"LastBil-7",	
							"Luft":{
								"2014":[2769,3854],
								"Years":{
									"2014":[2015,2016]
								}	
							},
							"Anden":{
								"2014":[3854,5239],
								"Years":{
									"2014":[2015,2016]
								}	
							}
						}
					},
					"Aksler-3":{
						"AkslerVogntog-1":{
							"Interval-key":"LastBil-5",	
							"Luft":{
								"2014":[219,510,839,1232,1526,2507,3480],	
								"Years":{
									"2014":[2015,2016]
								}	
							},
							"Anden":{
								"2014":[510,839,1232,1526,2507,3480,5284],
								"Years":{
									"2014":[2015,2016]
								}	
							}
						},
						"AkslerVogntog-2":{
							"Interval-key":"LastBil-6",
							"Luft":{
								"2014":[2447,3398,4700],
								"Years":{
									"2014":[2015,2016]
								}	

							},
							"Anden":{
								"2014": [3398,4700,6905],
								"Years":{
									"2014":[2015,2016]
								}	

							}
						},
						"AkslerVogntog-3":{
							"Interval-key":"LastBil-6",
							"Luft":{
								"2014":[1356,1684,2514],
								"Years":{
									"2014":[2015,2016]
								}	

							},
							"Anden":{
								"2014":[1684,2514,4004],
								"Years":{
									"2014":[2015,2016]
								}	

							}
						}
					}
				}
			},
			"EkslusivVejafgift":{
				"Aksler-2":{
					"Interval-key":"LastBil-8",
					"Motorkoretoj":{
						"Normal":{
							"2014":[false,2052,2052,2052,2052,2052,2052,2279,2610,3087,3604,4161,{"sats":60,"pr":200}],
							"Years":{
								"2014":[2015,2016]
							}	
						},
						"Udligning":{
							"2014":[false,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,{"sats":16,"pr":200}],
							"Years":{
								"2014":[2015,2016]
							}	
						}
					},
					"PaaHaengsKoretoj":{
						"Normal":{
							"2014":[false,552,672,825,988,1161,1344,1537,1740,1953,2176,2628,{"sats":40,"pr":200}],
							"Years":{
								"2014":[2015,2016]
							}	
						},
						"Udligning":{
							"2014":[false,200,250,300,400,450,550,650,750,850,1000,1100,{"sats":16,"pr":200}],
							"Years":{
								"2014":[2015,2016]
							}	
						}
					}
				},
				"Aksler-3":{
					"Interval-key":"LastBil-9",
					"Motorkoretoj":{	
						"Normal":{
							"2014":[{"sats":32,"pr":200},3069,3332,{"sats":36,"pr":200}],
							"Years":{
								"2014":[2015,2016]
							}	
						},
						"Udligning":{
							"2014":[{"sats":11,"pr":200},1150,1150,{"sats":13,"pr":200}],
							"Years":{
								"2014":[2015,2016]
							}	
						}
					},
					"PaaHaengsKoretoj":{
						"Normal":{
							"2014":[{"sats":20,"pr":200},1953,2156,{"sats":24,"pr":200}],
							"Years":{
								"2014":[2015,2016]
							}	
						},
						"Udligning":{
							"2014":[{"sats":12,"pr":200},1100,1200,{"sats":13,"pr":200}],
							"Years":{
								"2014":[2015,2016]
							}	
						}
					}
				}
			}
		},
		"Bus":{
			"Aksler-2":{
				"Interval-key":"Bus",	
				"Normal":{
					"2014":[450,585,810,900,1440,1920,2400,3120,3640,4160,{"sats":50,"pr":100}],
					"Years":{
						"2014":[2015,2016]
					}			
				},
				"Udligning":{
					"2014":[1130,1160,1230,1230,1230,1230,1230,1230,1230,1230,{"sats":14,"pr":100}],
					"Years":{
						"2014":[2015,2016]
					}
				}
			},
			"Aksler-3":{
				"Interval-key":"NoIntervals",	
				"Normal":{
					"2014":[{"sats":36,"pr":100}],
					"Years":{
						"2014":[2015,2016]
					}
				},
				"Udligning":{
					"2014":[{"sats":10,"pr":100}],
					"Years":{
						"2014":[2015,2016]
					}
				}
			}
		},
		"Taxa":{
			"Interval-key":"Taxa",	
			"Normal":{
				"Period":1,
				"2014":[0,0,0,0,0,0],
				"Years":{
					"2014":[2015,2016]
				}
			},
			"Udligning":{
				"Period":1,
				"2014":[2360/2,2920/2,3460/2,3790/2,4180/2,5020/2],
				"2015":[2400/2,2970/2,3520/2,3860/2,4260/2,5110/2],
				"2016":[2420/2,3000/2,3550/2,3900/2,4300/2,5160/2]
			}
		},
		"MC":{
			"Interval-key":"NoIntervals",	
			"Normal":{
				"2014":[640],
				"2015":[690],
				"Years":{
					"2015":[2016]
				}
			},
			"Udligning":{
				"2014":[510],
				"2015":[520],
				"2016":[530]
			}
		},
		"Trailer":{
			"Interval-key":"VareBil+Trailer",	
			"Normal":{
				"2014":[0,130,250,320,400,490],
				"2015":[0,140,270,340,430,530],
				"Years":{
					"2015":[2016]
				}
			},
			"Udligning":{
				"2014":[0,0,0,0,0,250],
				"2015":[0,0,0,0,0,250],
				"2016":[0,0,0,0,0,260]
			
			},
		},
		"Camper":{
			"Interval-key":"Camper",	
			"Normal":{
				"2014":[298,365,496,659,861,1187,{"sats":68,"pr":100}],
				"2015":[320,390,531,707,925,1274,{"sats":72,"pr":100}],
				"Years":{
					"2015":[2016]
				}
			}

		},
		
		"Traktor":{
			"Interval-key":"NoIntervals",	
			"Normal":{
				"Period":1,
				"2014":[61.85],
				"2015":[61.85],
				"Years":{
					"2015":[2016]
				}
			}
		},
		"Knallert":{
			"Interval-key":"NoIntervals",	
			"Normal":{
				"Period":1,
				"2014":[0],
				"Years":{
					"2014":[2015,2016]
				}
			}
		},		
		"LastbilEuroAfgift":{
			"IkkeEuro":{
				"Aksler-3-orless":{
					"2014":[7156,715,193,56],
					"Years":{
						"2014":[2015,2016]
					}	
				},
				"Aksler-4-ormore":{
					"2014":[11555,1155,305,56],
					"Years":{
						"2014":[2015,2016]
					}	
				}
			},
			"Euro-1":{
				"Aksler-3-orless":{
					"2014":[6336,633,171,56],
					"Years":{
						"2014":[2015,2016]
					}		
				},
				"Aksler-4-ormore":{
					"2014":[10437,1043,275,56],
					"Years":{
						"2014":[2015,2016]
					}	
				}
			},
			"Euro-2":{
				"Aksler-3-orless":{
					"2014":[5591,559,149,56],
					"Years":{
						"2014":[2015,2016]
					}		
				},
				"Aksler-4-ormore":{
					"2014":[9318,931,246,56],
					"Years":{
						"2014":[2015,2016]
					}	
				}
			}
		}
	}
	


	var logic = {
		el:"",
		wrapel:"",
		elwrap_spec:"",
		update_model: function (ele,wrapspec) {

			ele = (!ele && ele !== 0) ? this.el : ele
			wrapspec = (!wrapspec) ? this.elwrap_spec : wrapspec
			
			wrapele = (wrapspec == "change-vehicle") ? this.changevehicle(ele) : this.wrapel // setting type, ex "car"
						
			this.el 	= ele
			this.elwrap_spec = wrapspec
		
			
			// setting datamodel --- controller/data
			this.datarep[wrapspec] = (wrapspec != "undefined") ? ele : "deleting"
			// datamanipulation 
			this.datamani(ele,wrapspec)
			this.weighttype()
			// Toggle method - hides og shows --- view 
			this.Toogle_logic.DoToggle(wrapele)
			
			this.Toogle_logic.ComplexToggle()

			// doing specific operation depending on type --- creating correct table/data
			var tabel = this.checking()
			this.tobefilled();


			if (typeof tabel !== "undefined") {
				this.Do_Html_table(tabel)
				this.findrow(tabel.table,tabel.period)
				this.minifytable() // handling table issue on small screens - bootstrap model doesn't work
				this.hideexceptions()
			} else {
				$("#vehicle-table,#vehicle_heading").html("")
			}
		},
		changevehicle: function (el) {
			$(".form-group").hide().end().find(".vehicle").show().end().find(".active").removeClass("active").end().find("input").prop("checked",false)
			this.datarep = {}
			
			this.datarep.year = $("#year_afgifter").val()
			this.datarep.vehicle = el

			this.wrapel = el

			var arr = this.Start_values[el]
		
			for (var i = 0; i < arr.length; i++) {
				$("." + el + "[data-sublevel='" + arr[i][0] + "']").show()

				if (arr[i][1] !== false) {
					$("." + el + "[data-sublevel='" + arr[i][0] + "']")
						.find("input[value='" + arr[i][1] + "']")
						.prop("checked",true)
						.end()
						.find(".btn")
						.removeClass("active")			
						.find("input:checked")
						.closest("label")
						.addClass("active")
						.end().end().end()
						.find("select").val(arr[i][1]).change()

					
					this.update_model(arr[i][1],arr[i][0])
				}
			}
			return el	
		},
		"datarep": {
		
			// we all the data are stored!
		
		},
		"Start_values":{

			"car":[["fuel","benzin"],["regi","new-rules"]],
			"taxa":[["fuel","diesel"],["regi","new-rules"]],
			"mc":[["fuel","benzin"],["veteran",false],["mcinfo",false]],
			"van":[["fuel","diesel"],["regi","per_1"],["particle","part-pos"],["anvendelse",false],["vanWeigtClass",false]],
			"truck":[["vejafgiftspligt","ja"],["weight",false],["axes",false]],
			"bus":[["fuel","diesel"],["bus_axes",false],["weight",false]],
			"trailer":[["weight",false]],
			"camper":[["weight",false]],
			"knallert":[["weight",false],["knallertinfo",false]],
			"traktor":[["weight",false],["traktorinfo",false]]


			
		},
		checking: function () {
			// if results are to be shown


			var contain = {
				"car":["regi","fuel"],
				"van":["regi","fuel"],
				"truck":["axes","vejafgiftspligt"],
				"mc":["fuel"],
				"taxa":["regi","fuel"],
				"bus":["fuel","bus_axes"],
				"trailer":[],
				"camper":[],
				"knallert":[],
				"traktor":[]
			}

			var pairing = {
				// [needs to be i data if ["group" == "chosen"]]
				"truck":[["vogntog_axes",["truck-type-big","Vogntog"]],["truck-type-big",["vejafgiftspligt","ja"]],["truck-type-small",["vejafgiftspligt","nej"]],["affjedring",["vejafgiftspligt","ja"]],["fuel",["vejafgiftspligt","nej"]],["Euro-standard",["vejafgiftspligt","ja"]]],
				"car":[["particle",["fuel","diesel"]],["regi-sub",["regi","undetermined"]]],
				"van":[["vanWeigtClass",["regi","new-rules"]],["anvendelse",["regi","new-rules"]]],
				"mc":[[]],
				"taxa":[[]],
				"bus":[[]],
				"trailer":[[]],
				"camper":[[]],
				"knallert":[[]],
				"traktor":[[]]

			}

			var d = this.datarep,
				pointer = contain[d.vehicle],
				sec_pointer = pairing[d.vehicle]


			for (var i = 0; i < pointer.length; i++) {
				if (!(pointer[i] in d)) var error_ = true
			}

			for (var i = 0; i < sec_pointer.length; i++) {
				for (var j = 1; j < sec_pointer[i].length; j++) {	
					if (d[sec_pointer[i][j][0]] == sec_pointer[i][j][1] && !(sec_pointer[i][0] in d)) var error_ = true		
				}	
			}

			if (d.vehicle == "van" && d.regi !== "old-rules" && d.regi !== "new-rules") {
				var error_ = true
			}

			if (!error_) return this.findTable()

		},
		datamani: function () {
			
			var d = this.datarep	
			//console.log(d)	
			
			if ("regi" in d && d.vehicle == "van") {		
				for (var i =1;i <= 3;i++) {
					if ("regi-sub-" + i in d) {
						d.regi = d["regi-sub-" + i] 
						//delete d["regi-sub-" + i] 
					}
				}
			
				d.reg_detail = (d.regi == "per_1" || d.regi == "per_2" || d.regi == "per_3" || d.regi == "per_4") ? d.regi : d.reg_detail	
				d.regi = (d.regi == "per_1") ? "new-rules" : d.regi		
				d.regi = (d.regi == "per_2" || d.regi == "per_3" || d.regi == "per_4") ? "old-rules" : d.regi	
				
				
				if (d.reg_detail == "per_2") {
					d.old_sats = "PrivatAnvendelse_after2007"
				
				} else if (d.reg_detail == "per_3") {
					d.old_sats = "PrivatAnvendelse_before2007"
					
				} else if (d.reg_detail == "per_4") {
					d.old_sats = "PrivatAnvendelse_before1998"
				}			
			}
			
			if (d.vejafgiftspligt == "ja") {
			
				var total_axes = 0,
					vogntog = 0;
				
				switch (d.axes) {
					case "Aksler-2":
						total_axes = 2;
						break;
					case "Aksler-3":
						total_axes = 3;
						break;
					case "Aksler-4":
						total_axes = 4;
						break;
				}
				
				if (d["truck-type-big"] == "Vogntog") {
					
					switch(d.vogntog_axes) {
						case "AkslerVogntog-1":
							vogntog = 1;
							break;
						case "AkslerVogntog-2":
							vogntog = 2;
							break;
						case "AkslerVogntog-3":
							vogntog = 3;
							break;
					}
				}
	
				total_axes += vogntog;
				
				if (total_axes >= 4) {
					d["axesEuro"] = "Aksler-4-ormore"
				} else {
					d["axesEuro"] = "Aksler-3-orless"
				}
			}

			if ("regi-sub" in d) {
				d.regi = d["regi-sub"]
				delete d["regi-sub"]
			}

			else if ("regi-sub-sub" in d) {
				d.regi = d["regi-sub-sub"]
				delete d["regi-sub-sub"]
			}

			// specific case for cars,van,taxa, ect (where regi is a prop in datarep)
			if ("regi" in this.datarep) {
			
				if (this.datarep.regi == "new-rules") {
				
					$(".form-group[data-sublevel='fuel-consumption']").show()
					$(".form-group[data-sublevel='weight']").hide()
					delete this.datarep.weight
				
				} else {
					
					$(".form-group[data-sublevel='fuel-consumption']").hide()
					$(".form-group[data-sublevel='weight']").show()
					delete this.datarep["fuel-consumption"]
				}
			}
		
		},
		"Toogle_logic":{
			"car":[
				[["fuel","diesel","particle",true]],
				[["regi","undetermined","regi-sub",true],["regi-sub","undetermined","regi-sub-sub",true]],
				[["regi","old-rules","veteran",true]],
				[["regi","new-rules","el_info",true]]
			],
			"taxa":[
				[["fuel","diesel","particle",true]],
				[["regi","undetermined","regi-sub",true],["regi-sub","undetermined","regi-sub-sub",true]]
			],
			"van":[
				[["fuel","diesel","particle",[["regi","new-rules"]]]],
				[["regi","per_1","particle",[["regi","new-rules"]]]],
				[["regi","undetermined_2009","regi-sub-1",true]],
				[["regi","undetermined_2007","regi-sub-2",true]],
				[["regi","undetermined_1998","regi-sub-3",true]]

			],

			"truck":[
				[["vejafgiftspligt","ja","truck-type-big"],["truck-type-big","Vogntog","vogntog_axes"]],
				[["vejafgiftspligt","ja","affjedring"]],
				[["vejafgiftspligt","nej","truck-type-small"]],
				[["vejafgiftspligt","nej","fuel"]],
				[["vejafgiftspligt","ja","Euro-standard"]],
				[["vejafgiftspligt","ja","truk_kom",true]],
				[["vejafgiftspligt","nej","truk_kom_small",true]]


			],
			DoToggle: function (vehicle) {
			
				var pointer = this[vehicle] || []
		
				for (var i = 0; i < pointer.length; i++) {
					this.toggleSublevels(pointer[i])
				}
			},
			toggleSublevels: function  (arr) {
				
				var start = 0
			
				for (var i = 0; i < arr.length; i++) {

					// if clicked is inside [0] container and clicked specific button [1] ... then show [3]
					if (arr[i][0] == logic.elwrap_spec && logic.el == arr[i][1] && this.checkdependece(arr[i][3])) {
						this.UpdateGUI(arr[i][2],"show")
 
					} 
					else if (arr[i][0] == logic.elwrap_spec || start == 1) {
						this.UpdateGUI(arr[i][2],"hide")

						start = 1
					}				
				}
			},
			checkdependece: function (arr) {
				
				if ($.isArray(arr)) {
					for (var i = 0;i < arr.length;i++) {

						if (logic.datarep[arr[i][0]] != arr[i][1]) {
							return false
							} else {
							return true 
							}		
					}
											
				} else {
					return true 
				
				}
			},
			ComplexToggle: function () {
				var d = logic.datarep
				
					
				var arr = [
						["reg_detail","per_1","vanWeigtClass","show"],
						["reg_detail","per_2","vanWeigtClass","hide"],
						["reg_detail","per_3","vanWeigtClass","hide"],
						["reg_detail","per_4","vanWeigtClass","hide"],
						["regi","new-rules","fuel","diesel","particle","show"],
						["reg_detail","per_4","anvendelse","hide"],
						["reg_detail","per_1","anvendelse","show"],
						["reg_detail","per_2","anvendelse","show"],
						["reg_detail","per_3","anvendelse","show"]
						]
				
				
				for (var i=0;i<arr.length;i++) {
				
					var ok = true 
					for (var j=0;j<arr[i].length - 2;j = j+2) {
						if (!(arr[i][j] in d && d[arr[i][j]] == arr[i][j+1])) ok = false 			
					}
							
					if (ok) {
						ok = true 
						this.UpdateGUI(arr[i][arr[i].length - 2],arr[i][arr[i].length - 1])				
					}
				}
				
				if (logic.datarep["vehicle"] == "truck" && !(logic.datarep["truck-type-big"] == "Vogntog")) {
					
					$("[data-sublevel='truk_kom']").hide()
							
				} else if (logic.datarep["vehicle"] == "truck") {
					$("[data-sublevel='truk_kom']").show()
				}
				
				
				
			},
			UpdateGUI: function (ele,action) {
			
				if (action == "show") {
					$(".form-group[data-sublevel='" + ele + "']").fadeIn("slow")
								
									
				} else {
					$(".form-group[data-sublevel='" + ele + "']")
						.fadeOut("fast")
						.find(".btn")
						.removeClass("active")
						.find("input")
						.prop("checked",false)

					delete logic.datarep[ele]	
				}	
			}
		},
		findTable: function() {
			
			var d = this.datarep,
				t_fuel = d.fuel == "benzin"
		
			var tab,
				po = Afgifter.Intervals,
				header = []

			// ----------pointing to the correct table depending on data object -----------------------		
			switch (d.vehicle) {
				case "car":
					tab = (d.regi == "new-rules") ? Afgifter["km-liter-lov"] : Afgifter["Vagtafgift-lov"]
					break

				case "van":
					tab = (d.regi == "new-rules") ? Afgifter["km-liter-lov"] : Afgifter["Varebil"]
					break

				case "mc":
					tab = Afgifter.MC
					var int_key = tab["Interval-key"],
						period = 1
					break

				case "bus":
					tab = Afgifter.Bus[d.bus_axes]
					var int_key = tab["Interval-key"],
						period = 1
					break

				case "trailer":
					tab = Afgifter.Trailer
					var int_key = tab["Interval-key"],
						period = 1
					//tab = tab.Normal
					d.fuel = "diesel"
					break

				case "camper":
					tab = Afgifter.Camper
					var int_key = tab["Interval-key"],
						period = 2
					tab = tab.Normal
					break

				case "taxa":
					tab = (d.regi == "new-rules") ? Afgifter["km-liter-lov"] : Afgifter["Taxa"]
					var int_key = tab["Interval-key"]	
					break

				case "knallert":
					tab = Afgifter.Knallert
					var int_key = tab["Interval-key"],
						period = 1	
					tab = Afgifter.Knallert.Normal
					break
					
				case "traktor":
					tab = Afgifter.Traktor
					var int_key = tab["Interval-key"],
						period = 1	
					tab = Afgifter.Traktor.Normal
					break

				case "truck":

					var period = 1
					tab = Afgifter.LastBil

					if (d.vejafgiftspligt == "ja" && "axes" in d && "truck-type-big" in d) {
					
						var aks = (d.axes === "Aksler-4" && d["truck-type-big"] == "Vogntog") ? "Aksler-3" : d.axes
						tab = tab.InklusivAfgift[d["truck-type-big"]][aks]
						
						if (d["truck-type-big"] == "Lastbil") {
							var int_key = tab["Interval-key"]
							$("[data-sublevel='truk_kom']").hide()
							
						} else {
							tab = tab[d.vogntog_axes]
							var int_key = tab["Interval-key"]
							$("[data-sublevel='truk_kom']").show()
						}

						tab = tab[d.affjedring]
						var euroS = Afgifter.LastbilEuroAfgift[d["Euro-standard"]][d.axesEuro]


					} else if (d.vejafgiftspligt == "nej" && "axes" in d && "truck-type-small" in d) {
						
						var aks = (d.axes === "Aksler-4") ? "Aksler-3" : "Aksler-2"
						tab 		= tab.EkslusivVejafgift[aks]
						var int_key = tab["Interval-key"]
						tab 		= tab[d["truck-type-small"]]
					}
					break
			}

			var findyear = function (pos) {
				if ("Years" in pos) {
					for (var key in pos.Years) {
						if ($.inArray(d.year,key)) {
							return pos[key]
						}
					}				
				} else {
					return pos[d.year]
				}	
			}
			
			var indi = ("regi" in d && d.regi == "new-rules") ? "km/l" : "kg.",
				Afgift_type = ("regi" in d && d.regi == "new-rules") ? "Ejerafg." : "Vægtafg."
			
			
			
			// ------------ Are we fuel dependend --------------------
			if ("fuel" in d) {

				 if (d.fuel == "benzin") {
					var int_key = (int_key) ? int_key : tab.Normal["Interval-key"]
					var period	= (period) ? period : tab.Normal.Period 
					tab 		= $.extend(true,{},findyear(tab.Normal))
					tab			= this.reduceArray(tab,1)
					var table 	= this.DoInterval(po[int_key])
					table 		= this.AddColumn(this.ExpandArray(indi,table.length),table)
					table 		= this.AddColumn(tab,table)
					var text_p	= ($.isArray(period)) ? "" : this.periodeText(period)
					header.push(Afgift_type + text_p)
					
				 } else { // diesel-operations
					var int_key = (int_key) ? int_key : tab.Udligning["Interval-key"]
					var period	= (period) ? period : tab.Udligning.Period 
					var tab_ud	= findyear(tab.Udligning)
					var tab_nor	= $.extend(true,{},findyear(tab.Normal))
					tab_nor		= this.reduceArray(tab_nor,0)
					var table 	= this.DoInterval(po[int_key])
					table 		= this.AddColumn(this.ExpandArray(indi,table.length),table)
					table 		= this.AddColumn(tab_nor,table)
					table 		= this.AddColumn(tab_ud,table) 
					var text_p	= ($.isArray(period)) ? "" : this.periodeText(period)

					header.push(Afgift_type + text_p,"Udlign." + text_p)	
					
				 }

			} else { // alle andre forhold, hvor der IKKE er forskel på benzin/diesel, dvs. hvor der ikke er normal/diesel prop i obj	
				var int_key = (int_key) ? int_key : tab["Interval-key"]
				tab 		= findyear(tab)		
				var table	= this.DoInterval(po[int_key])
				
				table 		= this.AddColumn(this.ExpandArray(indi,table.length),table)
				table 		= this.AddColumn(tab,table)

				var text_p	= ($.isArray(period)) ? "" : this.periodeText(period)
				header.push("Vægtafg." + text_p)	
			}

		
			//----------------- Taxa special ---------------
			if (d.vehicle == "taxa") {
				this.nulify(table)
			}
						//-------- partikelfilter -------------
			if ("particle" in d && d.particle == "part-neg") {
				var part 	= this.Periodrespect(1000,period),
				partarr 	= (!$.isArray(part)) ? this.ExpandArray(part,table.length) : part 
				table 		= this.AddColumn(partarr,table)
				header.push("Part.afg." + text_p)
			} 
			
			//------- van specfic --------------------
			if (d.vehicle == "van") {	
				
				d.anvendelse = ("anvendelse" in d) ? d.anvendelse : 0
				
				if (d.regi == "new-rules") {	
					var pri 	= Number(findyear(Afgifter.Varebil["PrivatAnvendelse-kml-lov"][d.vanWeigtClass]))*d.anvendelse
					pri 		= this.ExpandArray(pri,table.length)	
				} else if ("old_sats" in d) {
					var pri = $.map(findyear(Afgifter.Varebil[d.old_sats]), function (n) {
						return n*d.anvendelse				
					}) 	
				}	
				table = this.AddColumn(pri,table)
				header.push("Privat anv." + text_p)
			}

			if (euroS) {
				header.push("Vejafgift")
				var sats = this.ExpandArray(findyear(euroS)[0],table.length)
				table = this.AddColumn(sats,table)
				
			}
			
			// --------------Adding ALL elements in array, except first three -----------------
			table = this.AddColumn(this.AddingArrays(table),table)
			
			header.push("Samlet" + text_p)
			
			var pr_year = this.MultiplyYear(this.ExportSubArray(table,table[0].length-1),period)
			table = this.AddColumn(pr_year,table)
			
			
			if (table[0].length == 6) {
				this.deleterarray(table,4)
				header.pop()
			}
			
			if (table[0].length == 7 && period == 1) {
				this.deleterarray(table,5)
				header.pop()
			}
			
			if ($.isArray(period)) {
			
				table = this.AddColumnspecific(this.makeperiod(period),table,3)
				header.unshift("periode")
						
			}

			header.push("Samlet<div>/år</div>")

			var returntable = {
				"table":table,
				"header":header,
				"period":period
			}
			
		
			
			return returntable
		
		},
		nulify: function (table) {
			for (var i=0;i<table.length;i++) {
				table[i][3] = 0
				
				if (table[i][4] && table[i][4] > 0) {
					table[i][4] *= 2
				}

			}
		
		},
		hideexceptions: function () {
			var d = logic.datarep
			
			if (d.vehicle === "knallert") $("#vehicle-table,#vehicle_heading").html("")
			
			
			
		},
		findrow: function (table,period) {

			var d = logic.datarep
			if ("fuel-consumption" in d || "weight" in d) {
					
				if ("fuel-consumption" in d && d["fuel-consumption"].length > 0) {
					d["fuel-consumption"] = d["fuel-consumption"].replace(",",".")
				}

				var inp = Number(d["fuel-consumption"]) || Number(d.weight),
					height = $(".scroll-table tr").innerHeight()

				if (!(inp>0)) {
					$(".scroll-table tr").removeClass("correctrow")	
					return
				}   			

				for (var i = 0; i < table.length; i++) {
					//var highBoo = ("weight" in d) ? inp <= table[i][1] : inp < table[i][1]
					if (inp >= table[i][0]  && inp <= table[i][1]) {
						var row = i,
							accumu = 0,
							rounded = this.Bigsize(Number(d["weight"]))

						for (var j=3;j<table[i].length;j++) {
														
							var objpr = table[i][j]

							if (typeof table[i][j] == "object" && j == table[i].length-1) {

								var sum = accumu * this.doperiod(period,i)  
								$(".scroll-table tr:eq(" + i +") td:eq(" + j + ")").html(sum.digits())
			
							} else if (typeof table[i][j] == "object" && j < table[i].length-1 && !table[i][j].accumlated) {
								var sum = rounded/objpr.pr * objpr.sats 
								accumu += sum
								$(".scroll-table tr:eq(" + i +") td:eq(" + j + ")").append("<br/>" + sum.digits() + " kr.")


							} else if (typeof table[i][j] == "number" && j < table[i].length-1 && sum > 0) {
								accumu +=  table[i][j]
							
							} else if (typeof table[i][j] == "object" && j < table[i].length-1 && table[i][j].accumlated) {
								$(".scroll-table tr:eq(" + i +") td:eq(" + j + ")").html(accumu.digits())

							}
						}			
					}
				}
				//console.log("inden scroll " + inp.toString().length + " " + new Date().getSeconds() + "," + new Date().getMilliseconds())
				$(".scroll-table tr.correctrow td:last-child").stop(true,true)
				$(".scroll-table").stop()	
				$(".scroll-table tr.correctrow").stop(true,true)	
				$(".scroll-table tr").removeClass("correctrow")	
				$(".scroll-table tr:eq(" + row +")").addClass("correctrow")

				$(".scroll-table").animate({scrollTop: height*row-height*2}, 500, function () {
				$(".scroll-table").stop()		

					//console.log("1." + new Date().getSeconds() + "," + new Date().getMilliseconds())

					$(".scroll-table tr.correctrow").animate({"opacity":1},400,function () {
						//console.log("2." + new Date().getSeconds() + "," + new Date().getMilliseconds())

						$(".scroll-table tr.correctrow").stop(true,true)	
						$(".scroll-table tr.correctrow td:last-child").animate({"font-size":"22px"},130,function () {
							//console.log("3." + new Date().getSeconds() + "," + new Date().getMilliseconds())
							$(".scroll-table tr.correctrow td:last-child").stop(true,true)
							$(".scroll-table tr.correctrow td:last-child").animate({"font-size":"1em"},130, function () {
								$(".scroll-table tr.correctrow td:last-child").stop(true,true)
								//$(".scroll-table td").css({"font-size":14})	
								//console.log("4." + new Date().getSeconds() + "," + new Date().getMilliseconds())
							})
						})
					})
				})
			}			
		},
		doperiod: function (per,i) {
			if ($.isArray(per)) {
				return per[i]
			
			} else {
				return per
			}
		},
		Bigsize: function(number) {
						
			var newnumber = (number % 100 > 0) ? number + 100 - (number % 100) : number;
			$("#vagtSpec").text("* Egenvægt - rundet op til nærmeste 100");
			
			return newnumber;
						
		},
		minifytable: function () {
			var sw = $(window).width(),
				tc = $("#vehicle-table tr:first td").length

			for (var i = 4; i < tc; i++) {

				if (sw < 400) {
					$("#vehicle-table td:nth-child(" + i + "), #vehicle_heading th:nth-child(" + i + ")").hide();
				} 


				
			}



		},
		Do_Html_table: function (table) {
			
			var htmlPrint = []
			var cleaner = function (ind) {
				
				if (typeof ind == "object" && "sats" in ind) {
					return ind.sats + " kr. pr. " + ind.pr + " kg."
				} else if (ind === false || ind == undefined)  {
					return "-"
				} else if (typeof ind == "number" && ind == Number.POSITIVE_INFINITY){
					return "og højere"
				} else if (typeof ind == "number") {
					
					return ind.digits()
				} else if (typeof ind == "string") {
					return ind
				
				} else {
					return "-"
				}
			}

			var heading = table.header,
				htmlPrint_heading = ["<tr>"],
				to_in_table = ("regi" in logic.datarep && logic.datarep.regi == "new-rules") ? "Til" : "Til"

				heading.unshift("Fra",to_in_table,"")
				//console.log(heading)

			for (var i = 0; i < heading.length; i++) {
				htmlPrint_heading.push("<th>" + heading[i] + "</th>")
			}

			htmlPrint_heading.push("</tr>")
			$("#vehicle_heading").html(htmlPrint_heading.join(""))	


			for (var i = 0; i < table.table.length; i++) {

				htmlPrint[i] = ["<tr>"]
				
				for (var j = 0; j < table.table[i].length; j++) {
					htmlPrint[i].push("<td>" + cleaner(table.table[i][j]) + "</td>")
				}

				htmlPrint[i].push("</tr>")

				htmlPrint[i] = htmlPrint[i].join()				
			}

			//htmlPrint.unshift(htmlPrint_heading.join(""))

			//htmlPrint.push(htmlPrint_heading.join(""))	
			htmlPrint = htmlPrint.join()
			$("#vehicle-table").html("<tbody>" + htmlPrint + "</tbody>")
			if ($("#vehicle-table tr:nth-last-child(2) td:last").text() == "NaN") $("#vehicle-table tr:nth-last-child(2)").remove() 
			//$("#vehicle-table tr:last").css({"visibility":"hidden"})
			//$("#vehicle_heading").prepend("<tr>" + $("#vehicle-table tr:nth-last-child(2)").html() + "</tr>")
			

			//$("#vehicle_heading").prepend("<tr>" + $("#vehicle-table tr:first").html() + "</tr>")

			//	$("#vehicle_heading tr:first").css({"visibility":"hidden"})
		},
		tobefilled: function () {
			$(".calculator .control-label").removeClass("tobefilled")
			
			$(".form-group:visible .btn-group").each(function (i,e) {
				
				//console.log($(this).find("input:checked").val())
			
				if (typeof $(this).find("input:checked").val() === "undefined") {
					console.log($(this).closest(".form-group").data("sublevel"))
					$(this).siblings(".control-label").addClass("tobefilled") 
				}
					/*$(this).closest(".control-label").addClass("tobefilled")*/
				
				
			}) 
		
		},
		reduceArray: function (arr,red) {
			
			return $.map(arr, function (n) {

				if ($.isArray(n)) {
					return n[red]
				} else {
					return n
				}
			})
		},
		weighttype: function () {
			
			var egenvagt 	= ["camper","car","taxa","bus"],
				totalvagt 	= ["trailer","truck","van"],
				vehicle		= logic.datarep.vehicle
		
			if ($.inArray(vehicle,egenvagt) !== -1) {
				$("#weighttype").text("Egenvægt")
				
			} else {
				$("#weighttype").text("Totalvægt")
			}
			
			if (logic.datarep["truck-type-big"] == "Vogntog") {
				$("#weighttype").text("Totalvægt på vogntog")
			}
		
		
		},
		ExpandArray: function (num,len) {

			var newarr = []
			for (var i = 0; i < len; i++) {
				newarr[i] = num 
			}

			return newarr

		},
		MultiplyYear: function (arr,period) {
			return $.map(arr, function (n,i) {
				if ($.isArray(period) && typeof arr[i] == "number") {
					return n * period[i]
					
				} else if (typeof arr[i] == "object") {
					arr[i].sats = ($.isArray(period)) ? (arr[i].sats * period[i]) : (arr[i].sats * period)
					arr[i].accumlated = true
					return arr[i]
					
				} else {
					return n * period
				}

			})
		},
		ExportSubArray: function (arr,index) {
			var newArr = []

			for (var i = 0; i < arr.length; i++) {
				newArr.push(arr[i][index])	
			}

			return $.extend(true,{},newArr)

		},
		makeperiod: function (period) {
			return $.map(period, function (n) {
				if (n == 2) {
					return "Halvår"
				} else {
					return "Kvartal"
				}
			})
		},
		Periodrespect: function (num,arr) {
			
			if (!$.isArray(arr)) {
				return num/arr
			} else {
				var newarr = []	
				for (var i = 0; i < arr.length; i++) {
					newarr[i] = num/arr[i]
				}
				return newarr
			}
		},
		AddNumberToArray: function (num,arr) {

			var newarr = []
			for (var i = 0; i < arr.length; i++) {

				if (typeof arr[i] == "object") {
					continue
				}

				newarr[i] = arr[i] + num 
			}

			return newarr
		},
		AddColumn: function (addarr,Toarr) {
			//arr needs to contain a sub-array [[x,y,new],[x,y,new]]
			var newarr = []
			for (var i = 0; i < Toarr.length; i++) {
				newarr[i] = Toarr[i]
				newarr[i].push(addarr[i])
			}
			return newarr

		},
		
		AddColumnspecific: function (addarr,Toarr,index) {
			//arr needs to contain a sub-array [[x,y,new],[x,y,new]]
			var newarr = []
			for (var i = 0; i < Toarr.length; i++) {
				newarr[i] = Toarr[i]
				newarr[i].splice(index ,0,addarr[i])
			}
			return newarr

		},
		AddingArrays: function (table) {
			
			
			var returnArr = []
			
			for (var i = 0; i < table.length; i++) {
				
				var sum = 0,
					sumArr = {}
				
				sumArr.pr 	= 0
				sumArr.sats = 0
					
				for (var j = 3;j < table[i].length;j++) {
					
					if (typeof table[i][j] == "number") {	
					
						sum 		+= table[i][j]
						
					} else if (typeof table[i][j] == "object") {
						sumArr.pr 	= table[i][j]["pr"]
						sumArr.sats += table[i][j]["sats"] 	
						sumArr.accumlated = true
						
					} else if (typeof table[i][j] === false || table[i][j] === undefined) {
						sum = "-"
					}


				}

				if (sumArr.sats > 0) {
					returnArr.push(sumArr)
					//table[i].push(sumArr)
				} else {
					returnArr.push(sum)
					//table[i].push(sum)
				}	
			}

			return returnArr
		},
		deleterarray: function (arr,index) {
		
			for (var i = 0; i < arr.length; i++) {
				arr[i].splice(index,1)
			}
		},
		periodeText: function (period) {
			if (period == 2) {
				return "<div>/Halvår</div>"
			} else {
				return ""
			}

		},
		DoInterval: function  (interval) {

			var arr = [],
				special = 0,
				kml = 0
			

			if (!$.isArray(interval)) {
				interval = interval.Interval
				kml = 0.1
				special = 0
				
			} else {
				special = 1
			}

			var len = interval.length

			for (var i = 0; i < len+1; i++) {
				
				arr[i] = []

				if (i > 0 && i < len) {
					arr[i][0] = interval[i-1] + special
					arr[i][1] = interval[i] - kml
					
					if (Math.ceil(arr[i][1]) - arr[i][1] > 0) {
						if (arr[i][1].toString().split(".")[1].length > 5) arr[i][1] = Number(arr[i][1].toFixed(1))
					
					}
					
				} 
				else if (i == 0) {
					arr[i][0] = 0
					arr[i][1] = (typeof interval[i] == "number") ? interval[i] - kml : Number.POSITIVE_INFINITY
				} 
				else if (i == len) {

					arr[i][0] = interval[i-1] + special
					arr[i][1] = Number.POSITIVE_INFINITY

				}
			}

			return arr
		}
	};


	Number.prototype.digits = function () {
		

		var sd 		= Math.ceil(this) - this,
			s 		= Math.floor(this).toString(),
			self	= Number(this.toString()),
			dec_n 	= (sd > 0) ? self.toString().split(".")[1].length : ""
			dec 	= (sd > 0) ? ("," + self.toFixed(dec_n).toString().split(".")[1]) : "",
			
			len 	= s.length,
			newS  	= ""

        //var s = Math.round(this).toString(), len = s.length, newS = "";

        for (var i = 0; i < len + 1; i++) {
            newS = s.charAt(len - i) + newS;
            if (i % 3 == 0 && i != 0 && i != len) {
                newS = "." + newS;
            }
        }
        //return newS;
        return newS + dec
    }

    Number.prototype.dkdeci = function () {
        return this.toString().replace(".", ",")
    }


	events()
	//debugger
	logic.changevehicle("car")
	$("#actualyear_1997").text(new Date().getFullYear() + " - 1997")
	$("#actualyear_2010").text(new Date().getFullYear() + " - 2010")
	
	
	function events () {

		$(document).on("change keyup","input[type='radio']",function (){
			var $this = $(this),
				wrap = $(this).closest(".form-group"),
				el = wrap.find("input:checked").val(),
				elwrap_spec = wrap.data("sublevel")

			logic.update_model(el,elwrap_spec)
		})

		$(document).on("change keyup","select,input[type='tel']",function (){
			var $this = $(this),
				el = $this.val(),
				elwrap_spec = $(this).closest(".form-group").data("sublevel")

			if ($(this).attr("id") == "year_afgifter") {
				logic.datarep.year = el
				el = undefined,
				elwrap_spec = undefined
			}

			el = (el == "") ? 0 : el 

			logic.update_model(el,elwrap_spec)
		})


		$(".scroll-table .table-responsive").on("scroll",function () {
			var leftscroll = $(".scroll-table .table-responsive").scrollLeft()
			var headingScroll = $(".table-responsive.heads").scrollLeft()

			$(".table-responsive.heads").scrollLeft(leftscroll)

		})
		
		$("#vehicle-type").val("car")
		$("#ratingWrapperAll").replaceAll(".insert-kundetilfredshed")

	}
	
	/* skjuler "Er du tilfredshed med denne løsning" */
	
	var url = window.location.href, 
		reg = /oId=2172770/

	if (reg.exec(url)) $(".little_topmargin").addClass("hidden")
	




    
	

})

