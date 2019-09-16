if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

if (!Array.prototype.every) {
  Array.prototype.every = function(callbackfn, thisArg) {
    'use strict';
    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the this 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method
    //    of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
    if (typeof callbackfn !== 'function') {
      throw new TypeError();
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0.
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method
        //    of O with argument Pk.
        kValue = O[k];

        // ii. Let testResult be the result of calling the Call internal method
        //     of callbackfn with T as the this value and argument list 
        //     containing kValue, k, and O.
        var testResult = callbackfn.call(T, kValue, k, O);

        // iii. If ToBoolean(testResult) is false, return false.
        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}

Number.prototype.digits = function () {
	
	var sd 		= Math.ceil(this) - this,
		s 		= Math.floor(this).toString(),
		self	= Number(this.toString()),
		dec_n 	= (sd > 0) ? self.toString().split(".")[1].length : "",
		dec 	= (sd > 0) ? ("," + self.toFixed(dec_n).toString().split(".")[1]) : "",
		len 	= s.length,
		newS  	= ""

    for (var i = 0; i < len + 1; i++) {
        newS = s.charAt(len - i) + newS;
        if (i % 3 == 0 && i != 0 && i != len) {
            newS = "." + newS;
        }
    }
    //return newS;
    return newS + dec
}

function generateUniqueToken (num) {

  var token = "";

  for (var i = 0;i < num;i++) {

    var type  = random(1,3),
      key   = ""; 

    switch (type) {
      case 1:
        key = String.fromCharCode(random(97,122));
        break;

      case 2:
        key = String.fromCharCode(random(65,90));
        break;

      case 3:
        key = random(0,9)
        break;
    }
    token = token.concat(key)   
  }
  return token 
}

function random(min,max) {
  return Math.floor(Math.random() * (max-min+1) + min)
}


(function () {

	function skudaar (year) {
		
		if (new Date (year,1,29).getDate() === 29) return true; 
		return false;		
	}

	function daysInYear (year) {
		
		if (skudaar(year)) return 366; 
		return 365
	}
	
	function Days_in_Month (year) {
		
		var feb_days = (skudaar(year)) ? 29 : 28;		
		return [31,feb_days,31,30,31,30,31,31,30,31,30,31]

	}
	
	function DaysInMonth (month,year) {
		
		var y = Days_in_Month(year)	
		return y[month-1]
	
	}

	function NamesOfMonths (month,lan) {
		/* monthinput 0-11 */
		var month_name = ["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december"];
		return month_name[month]

	}

	function toSingle (day,month,year) {
		
	 	var daysinMonth = Days_in_Month(year),
			sum			= 0 

		for (var i = 0; i < month-1;i++) sum += daysinMonth[i]

		sum += day

		return {
			dayN:sum,
			year:year,
			month:month,
			day:day
		}
	}

	function weeksinYear(year) {
	
		var first 			= new Date (year,0,1).getDay(),
			years_day		= daysInYear(year),
			deci_thursday	= 4/7, // mon-thurs in deci (4/7), if thursdays in then its a week
			proxy_array		= [0,1,2,3,-3,-2,-1],
			proxy,
			weeks
		
		first 			= (first === 0) ? 6 : first-1;
		proxy 			= proxy_array[first];
		
		if ((proxy + years_day)/7 >= (52 + deci_thursday)) {
			weeks = 53; 
		} else {
			weeks = 52;
		}

		return {weeks:weeks,firstday:first}

	}

	function getDayInWeekOne (year) {

		var firstday 	= weeksinYear(year).firstday,
		proxy_array		= [[year,0,1],[year-1,11,31],[year-1,11,30],[year-1,11,29],[year,0,4],[year,0,3],[year,0,2]],
		firstweek 		= proxy_array[firstday]
			
		return toSingle(firstweek[2],firstweek[1]+1,firstweek[0])

	}

	function findWeek (dateObj) {

		dateObj = formateDate(dateObj)

		var weeks = findweeksinYear(dateObj.year)

		for (var i = 0; i < weeks.length; i++) {
			if (isInside(dateObj,weeks[i][1],weeks[i][2])) return weeks[i][0]
		}
	}
	
	function datesOfWeek(week,year) {

		var weeks 	= findweeksinYear(year),
			first,
			arr 	= []
			
		for (var i = 0;i < weeks.length;i++) {
			if (weeks[i][0] === week) {
				first = weeks[i][1]
				break;
			}
		}
					
		for (var i = 0; i < 7; i++) arr.push(addays(first,i))
	
		return arr;

	}

	function isInside(dateObj_check,dateObj_from,dateObj_to) {

		dateObj_check 	= formateDate(dateObj_check);
		dateObj_from 	= formateDate(dateObj_from);
		dateObj_to 		= formateDate(dateObj_to);

		if (higherOrEqual(dateObj_check,dateObj_from) && !(higherOrEqual(dateObj_check,addays(dateObj_to,1)))) return true

		return false

	}

	function higherOrEqual (dateObj_check,dateObj_relation) { // tjek om første parameter er senere(=) end andet parameter

		dateObj_check = formateDate(dateObj_check);
		dateObj_relation = formateDate(dateObj_relation);


		if (dateObj_check.year > dateObj_relation.year) {
			return true

		} else if (dateObj_check.year < dateObj_relation.year) {
			return false

		} else if (dateObj_check.dayN >= dateObj_relation.dayN) {
			return true
		
		} else {
			return false
		}
	}

	var cached_week_year = {}

	function findweeksinYear (year) {

		if (cached_week_year[year]) {

			return cached_week_year[year]
		
		} else {

			var firstWeekDate 	= getDayInWeekOne(year);
				thisYearStart 	= (firstWeekDate.year === year) ? true : false,
				weeksInYear 	= weeksinYear(year).weeks,
				weekArray 		= []

			// Hvis første dage af junar hører til uge 52/53 fra tidligere år
			if (thisYearStart && firstWeekDate.dayN > 1) {
			
				var lastYear 	= getDayInWeekOne(year-1),
					weeksLast 	= weeksinYear(year-1).weeks,
					lastlast 	= addays(lastYear,7*(weeksLast-1))

				weekArray.push([weeksLast,lastlast,addays(lastlast,6)])			
			
			}

			for (var i = 0, j = 0 ; i < weeksInYear; i++,j += 7) weekArray.push([i+1,addays(firstWeekDate,j),addays(firstWeekDate,j+6)]);

			var lastweekIncurrent = weekArray[weekArray.length-1][2]

			// Hvis sidste dage i december faktisk er uge 1 i næste år med
			if (lastweekIncurrent.year === year && lastweekIncurrent.dayN < daysInYear(lastweekIncurrent.year)) weekArray.push([1,addays(lastweekIncurrent,1),addays(lastweekIncurrent,7)]);			
			
		cached_week_year[year] = weekArray
	
		return weekArray

		}	
	}

	function getweeksInMonth (month,year,addedge) {

		var w = findweeksinYear(year),
			a = []


		if (month === 1 && w[0][1].dayN > 1) a.push(w[0])
		
		for (var i = 0; i < w.length; i++) {

			var dateObj		= w[i][1],
				monthTest	= dateObj.month,
				yearTest 	= dateObj.year

			if (monthTest === month && year === yearTest) a.push(w[i])
		}


		return a

	}

	function getdifference (from,to,type) {

		from 	= formateDate(from);
		to 		= formateDate(to);

		var from_base 		= from.dayN,
			from_year 		= from.year,
			to_base 		= to.dayN,
			to_year 		= to.year,
			wholeYearDays	= 0,
			daysInFirst 	= daysInYear(from_year) - from_base,
			daysInLast 		= to_base,
			dif,
			including 		= (type) ? 1 : 0

		for (var i = from_year;i < to_year-1;i++) {
			wholeYearDays += daysInYear(i)
		}

		dif = (to_year - from_year > 0) ? daysInFirst + wholeYearDays + daysInLast : to_base - from_base

		return dif + including

	}

	function addays (dateObj,change) {

		var toSingle 	= formateDate(dateObj),
			base 		= toSingle.dayN,
			year		= toSingle.year,
			d 			= 0,
			y 			= year,
			N 			= base + change,
			R;
			
		while (d <= change) {

			if (y === year) {

				if (N > daysInYear(year)) { // mere end ét år
					d = daysInYear(year) - base

				} else { // er i samme år 
					R = N;
					break;	
				}

			} else { // y > base-year

				if (daysInYear(y) + d + base >= N) { // sidste år
					R = N - d - base
					break

				} else {

					d += daysInYear(y)

				}	
			}

			y++
		}

		return simpleDate({dayN:R,year:y})


	}

	function simpleDate (simple) {

	 	var year 		= simple.year,
	 		daysinMonth = Days_in_Month(year),
	 		sum 		= 0,
	 		dayinYear 	= simple.dayN,	
	 		month 		= 0,
	 		day  		= 0

		for (var i = 0; i < 12; i++) {
	
			sum += daysinMonth[i];
			
			if (sum >= dayinYear) {

				month 	= i + 1;
				day 	= dayinYear - (sum - daysinMonth[i]);
				break;
			}
		}

		return {
			dayN:dayinYear,
			year:year,
			month:month,
			day:day
		}
	}

	function DateText (dateObj,lan) {
		
		dateObj = formateDate(dateObj)
		
		var date 		= dateObj.day,
			month		= dateObj.month,
			monthTxt	= NamesOfMonths(month-1,"dk"),
			year 		= dateObj.year,
			a			= date + ". " + monthTxt,
			b			= date + ". " + monthTxt.substr(0,3) + " " + year,
			c			= date + ". " + monthTxt.substr(0,3),
			d			= date + "/" + month + "/" + year

		return [a,b,c,d]
	}

	function formateDate (dateObj) {
	
		if (dateObj.constructor === Array) {
			return toSingle.apply(this,dateObj)
		} else {
			return dateObj
		}
	}
	
	function getMonthLimit(month,year) {
	
		var firstDay 	= toSingle(1,month,year),
			lastDay		= toSingle(DaysInMonth(month,year),month,year)
		
		return {firstDay:firstDay,lastDay:lastDay}
	}

	function getWeekday (dateObj) {

		dateObj = formateDate(dateObj);

		var year 	= dateObj.year,
			month 	= dateObj.month-1,
			day 	= dateObj.day,
			weekday = new Date(year,month,day).getDay()

		return (weekday === 0) ? 6 : weekday-1

	}

	function Calender (from,to) {

		from 	= formateDate(from);
		to 		= formateDate(to);

		var dates_length 	= getdifference(from,to,true),
			date_array 		= [],
			dateObj,
			firstWeek 	 	= findWeek(from),
			proxy,
			firstweekday 	= getWeekday(from),
			weekCount		= firstWeek,
			weeksYear		= weeksinYear(from.year).weeks;

		for (var i = 0; i < dates_length;i++) {

			dateObj 		= addays(from,i);
			dateObj.weekday = getWeekday(dateObj);
			proxy 			= firstweekday++ % 7;			

			// inkrementerer ugenummer på mandage, men ikke hvis startsdag er en mandag
			if (proxy === 0 && i > 0) {
				++weekCount
						
				if (weekCount === weeksYear+1) 		weekCount = 1 //når den prøver at sætte til 54(53 uger) eller 53 (52 uger) resætter den 	
				if (weekCount === 2)			 	weeksYear = weeksinYear(dateObj.year).weeks					
			}	
		
			dateObj.week 	= weekCount; 	
			date_array.push(dateObj)
		}

		this.calender = date_array
	};

	function changeCalender(calender) {

		return new GetPeriod(calender);

	}
	
	function GetPeriod(calender) {

		this.Calender = calender.calender
		
		this.indexStart			= 0,
		this.indexEnd			= this.Calender.length-1,
		this.indexInCalender 	= []
				
	}

	GetPeriod.prototype.findIndex = function (dateObj) {

		dateObj = formateDate(dateObj)
	
		var c = this.Calender;
				
		for (var i = 0; i < c.length; i++) {
			
			if (dateObj.dayN === c[i].dayN && dateObj.year === c[i].year) return i 
		
		}
		
		return false
		
	}

	GetPeriod.prototype.adjustPeriodIndex = function (from,to) {


		var c 					= this.Calender,		
			CalBeginIndside		= (isInside(c[0],from,to)) ? 0 : false,
			CalEndInside 		= (isInside(c[c.length-1],from,to)) ? c.length-1 : false;

		this.indexStart		= this.findIndex(from) || CalBeginIndside,
		this.indexEnd	 	= this.findIndex(to) || CalEndInside
						
	}

	GetPeriod.prototype.limitDay = function (Arr_dateObj) {

		var index;
		
		this.indexInCalender = []

		for (var i = 0; i < Arr_dateObj.length; i++) {

			index = this.findIndex(formateDate(Arr_dateObj[i]));

			if (index !== false) this.indexInCalender.push(index);

		}
		
		if (this.indexInCalender.length === 0) this.indexStart = false

		return this
	}


	GetPeriod.prototype.limitMonth = function (month,year) {
		
		var limits = getMonthLimit(month,year)

		this.adjustPeriodIndex(limits.firstDay,limits.lastDay);

		return this

	}

	GetPeriod.prototype.limitWeek = function (week,year) {
		
		var weekLimit 	= datesOfWeek(week,year)

		this.adjustPeriodIndex(weekLimit[0],weekLimit[6]);

		return this

	}
	
	GetPeriod.prototype.limitYear = function (year) {
		
		var first 	= toSingle(1,1,year),
			last 	= toSingle(31,12,year)

		this.adjustPeriodIndex(first,last);

		return this

	}

	GetPeriod.prototype.limitWeekday = function (weekday) {
	
		var c 			= this.Calender,
			indexArray 	= []
					
		if (this.indexInCalender.length > 0) { 

		} else {

			for (var i = this.indexStart; i <= this.indexEnd; i++) {

				if (weekday === c[i].weekday) indexArray.push(i)

			}
			
			this.indexInCalender = indexArray; 

			if (this.indexInCalender.length === 0) this.indexStart = false

		}
		
		return this 
	} 

	GetPeriod.prototype.doChange = function (proptoMod) {
	
		var c 			= this.Calender,
			Ia 			= this.indexInCalender,// IndexArray
			indexArray 	= []

		if (Ia.length > 0) {		
		
			for (var i = 0; i < Ia.length; i++) {
		
				for (var prop in proptoMod) {
					c[Ia[i]][prop] = proptoMod[prop]
				}	
			}

			return true
			
		} else if (this.indexStart !== false && this.indexEnd !== false) {
		
			for (var i = this.indexStart; i <= this.indexEnd; i++) {	
				for (var prop in proptoMod) {
					c[i][prop] = proptoMod[prop]
				}	
			}	
			return true
			
		} else {	
			return false 		
		}	
	}

	Calender.prototype.findIndex = function (dateObj) {

		dateObj = formateDate(dateObj)
	
		var c = this.calender
				
		for (var i = 0; i < c.length; i++) {
			
			if (dateObj.dayN === c[i].dayN && dateObj.year === c[i].year) return i 
		
		}
		
		return false	
	}
	
	function exportScope () {

		return {
			Date_to_Single:toSingle,
			text:DateText,
			addDate:addays,
			dif:getdifference,
			weeksInYear:weeksinYear,
			dateOfFirstWeekDay:getDayInWeekOne,
			Calender:Calender,
			formateDate:formateDate,
			findweeksinYear:findweeksinYear,
			getweeksInMonth:getweeksInMonth,
			higherOrEqual:higherOrEqual,
			isInside:isInside,
			datesOfWeek:datesOfWeek,
			GetPeriod:GetPeriod,
			daysInMonth:DaysInMonth,
			changeCalender:changeCalender,
			getMonthLimit:getMonthLimit,
			getWeekday:getWeekday,
			simpleDate:simpleDate,
			NamesOfMonths:NamesOfMonths
		}
	}

	window.dates = exportScope;

})();

var cal = dates();

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function BF_manager (obj,year,index) {

	this.id 			= "Q" + generateUniqueToken(15);

	if (obj.generated) {

		var from 			= cal.simpleDate({dayN:obj.from,year:year}),
			to  			= cal.simpleDate({dayN:obj.to,year:year});
		this.address 		= obj.address;
		this.year 			= year;
		this.from 			= from;
		this.to 			= to;
		this.dk 			= obj.dk;
		this.generated		= obj.generated;
		//this.calender 		= new Calenderwrap(from,to);
		this.calculated 	= true;
		this.numberTrips 	= this.normalDays();
		this.udkantSatsApply= false;
		this.index 			= index+1;
	
	} else {
	
		this.generated		= obj.generated;
		this.year 			= year;
		this.index 			= index+1;
		this.dk 			= true;
		this.from			= cal.formateDate([1,1,year]);
		this.to 			= cal.formateDate([31,12,year]);
		this.numberTrips 	= this.normalDays();
		//this.calender 		= new Calenderwrap(this.from,this.to);
	
	}

}

BF_manager.prototype.getReturnRouteAddresses = function () {

	var addressCopy = this.address.slice();
	addressCopy.push(addressCopy[0])

	return addressCopy 

}

BF_manager.prototype.routeProvider = function () {
	return ("google" in this) ? "google" : "krak"
}

BF_manager.prototype.getDistance = function (distance) {
	return this.distance
}  

BF_manager.prototype.setDistance = function () {
	this.distance = this[this.routeProvider()].distance
} 

BF_manager.prototype.checkFerry = function () {
	return this[this.routeProvider()].ferry
} 

BF_manager.prototype.getHomeAddress = function () {
	return this[this.routeProvider()].addressInfo[0]
} 

BF_manager.prototype.normalFradrag = function () {

	var d = this.getDistance(),
		m = (d > this.satser.kmLimit) ? this.satser.kmLimit : d,
		s = this.satser

	return (m - 24) * s.normal 

}

BF_manager.prototype.overAfstandFradrag = function () {

	var d = this.getDistance(),
		s = this.satser,
		a = d - s.kmLimit,
		e = (this.udkantSatsApply === true) ? s.normal : s.altSats

	return (a > 0) ? (e * a) : 0

}

BF_manager.prototype.fradrag_prDay = function () {

	var a = Number((this.normalFradrag() + this.overAfstandFradrag() ).toFixed(2)) 

	return (a > 0 || this.checkFerry()) ? a : 0
}

BF_manager.prototype.fradragTotalNetto = function () {
	return Math.ceil(this.fradrag_prDay() * this.numberTrips)
}


BF_manager.prototype.getSatser = function () {

	var normalSats 		= [1.93,1.99,2.05,2.1,2.13,2.1],
		lavSats			= [0.97,1,1.03,1.05,1.07,1.05],
		granseLavSats 	= [120,120,120,120,120,120],
		yearArr 		= [2017,2016,2015,2014,2013,2012],
		storeBalt_bil 	= [110,110,90,90,90,90],
		oresund_car 	= [50,50,50,50,50,50],
		storeBalt_tog 	= [15,15,15,15,15,15],
		oresund_tog 	= [8,8,8,8,8,8],
		pos 			= $.inArray(this.year,yearArr)

	var altSats 		= (this.udkantskommuneUser) ? normalSats[pos] : lavSats[pos]  

	this.satser = {
		normal:normalSats[pos],
		altSats:altSats,
		storebalt:{
			car:storeBalt_bil[pos],
			train:storeBalt_tog[pos]
		},
		oresund:{
			car:oresund_car[pos],
			train:oresund_tog[pos]
		},
		storeBalt_bil:storeBalt_bil[pos],
		storeBalt_tog:storeBalt_tog[pos],
		kmLimit:granseLavSats[pos]
	}
}

BF_manager.prototype.udkantskommuneCheck = function () {

	var kommune = this.getHomeAddress().kommune;

	var gamleUdkantskommuner =[
		"Læsø","Brønderslev","Hjørring","Frederikshavn","Faaborg-Midtfyn","Bornholm","Guldborgsund",
		"Lolland","Bornholm","Morsø","Norddjurs","Samsø","Svendborg","Tønder","Vesthimmerland","Ærø"							
	]

	var nyeUdkantskommuner = [
		"Jammerbugt","Odsherred","Skive","Sønderborg","Sønderborg","Thisted","Slagelse","Struer","Vordingborg","Aabenraa"
	]

	var type = false;

	if (gamleUdkantskommuner.indexOf(kommune) > -1) type = "old";
	if (nyeUdkantskommuner.indexOf(kommune) > -1) type = "new";

	if (type) {

		var y 		= this.year, 
			range 	= (type === "old") ? [2007,2018] : [2015,2018]

		if (y >= range[0] && y <= range[1]) {

			this.udkantskommune = type;
			return true

		} else {
			this.udkantskommune = false;
			return false
		}

	} else {
		this.udkantskommune = false;
		return false
	}

}

BF_manager.prototype.normalDays = function () {

	var days = cal.dif(this.from,this.to,true)

	if (days === 365 || days === 366) {
		return 216	
	} else {
		return Math.round((days/30.5) * 18)
	}
}

BF_manager.prototype.checkstoreBalt = function () {

	if (this.routeProvider() === "krak") {

		var a = this.krak.addressInfo;

		for (var i = 0; i < a.length-1; i++) {

			var fixed 	= a[i].postnr,
				compare = a[i+1].postnr 

			if ((fixed >= 5000 && compare < 5000) || (fixed < 5000 && compare >= 5000)) return true
		}

		return false

	} else {
	
		return (this.google.bridgeCrossing.storebalt > 0) ? true : false 
	}
	
}

BF_manager.prototype.setBridgeDeduction = function (bridge) {

	var BF_scope = this;

	if (this[bridge]) {

		var trips =  Number(this[bridge].passages_pr_trip) 

		if (trips > 0) {

			var transport = this[bridge].transport

			if (transport && transport !== "dif") {

				var type 	= (transport === "car") ? "car_passages" : "train_passages",
					inv 	= (type === "car_passages") ? "train_passages" : "car_passages"

				this[bridge][type] 	= this.numberTrips * Number(this[bridge].passages_pr_trip);
				this[bridge][inv]	= 0; 

			} else if (transport && transport === "dif") {

				this.jqueryElement.find("." + bridge + " .custom-trips").each(function () {
					
					var $this 	= $(this),
						val 	= Number($this.val()), 	
						id 		= $this.attr("name")

					BF_scope[bridge][id] = (val >= 0) ? val : 0;
					
				})			
			} 

		} else if (trips === 0) {

			this[bridge].car_passages 	= 0
			this[bridge].train_passages = 0
			this[bridge].transport 		= false

		}
	}	
}

BF_manager.prototype.updateView_prday = function ($appendIn) {

	var arrTxt = []
	
	if (this.getDistance() > 24) {

		arrTxt.push("<span class='calculation'>De første 24 km: </span><span class='pull-right'> 0,00 kr.</span>")

		var a = (this.getDistance() > this.satser.kmLimit) ? (this.satser.kmLimit - 24) : (this.getDistance() - 24);

		arrTxt.push("<span class='calculation'> 25 - " + this.satser.kmLimit + " km: " + a + " km &#215 " + (this.satser.normal).digits() + " kr. pr. km </span><span class='pull-right'>" + this.normalFradrag().toFixed(2).toString().replace(".",",") + " kr.</span>")

	} else {
		arrTxt.push("<span class='calculation'>Afstand under 24 km (intet fradrag) </span><span class='pull-right'> - kr.</span>")
	}

	if (this.getDistance() < 24 && this.checkFerry()) {
		arrTxt.push("<span class='calculation'>" + this.getDistance() + " km - " + " 24 km: " + (this.getDistance() - 24) + " &#215 " +  (this.satser.normal).digits() + " kr. pr. km </span><span class='pull-right'>" + this.normalFradrag().toFixed(2).toString().replace(".",",") + " kr.</span>")
	}

	if (this.getDistance() > this.satser.kmLimit) {

		var b = (this.udkantSatsApply) ? (this.satser.normal + " (forhøjet sats)") : this.satser.altSats.digits()  
		arrTxt.push("<span class='calculation'>Over " + this.satser.kmLimit + " km: " + (this.getDistance() - this.satser.kmLimit) + " km &#215 " + b + " kr. pr. km </span><span class='pull-right'>" + this.overAfstandFradrag().toFixed(2).toString().replace(".",",")  + " kr.</span>")

	}

	arrTxt.push("<div class='total-sum'><span class='calculation'>Fradrag pr. dag (total) </span><span class='pull-right'>" + this.fradrag_prDay().toFixed(2).replace(".",",") + " kr.</span></div>")

	arrTxt = arrTxt.map(function (v) {
		return "<div class='clearfix'>" + v + "</div>"
	})

	arrTxt = arrTxt.join("");
	($appendIn).html(arrTxt)

}

BF_manager.prototype.printUdkant = function (type,$appendIn) {

	var BF_scope = this; 

	var clone = $(".copy-udkant").clone();

	clone
		.removeClass("copy-udkant hidden")
		.find(".udkants-sats-right").on("change", function () {

			BF_scope.udkantSatsApply = ($(this).is(":checked")) ? true : false;
			BF_scope.updateView_prday(BF_scope.jqueryElement.find(".calculation-pr-day-detailed"));
			BF_scope.updateView(BF_scope.jqueryElement.find(".calculation-pr-day"));			
		})

	clone.appendTo($appendIn)

}

BF_manager.prototype.printFerry = function ($appendIn) {

	var BF_scope = this; 

	var clone = $(".copy-ferry").clone()

	clone
		.removeClass("copy-ferry hidden")
		.find(".ferry-price").on("keyup change", function () {

			var value = Number($(this).val())

			BF_scope.ferryExpanses = (value > 0) ? value : 0;
			BF_scope.updateView(BF_scope.jqueryElement.find(".calculation-pr-day"));

		})
		.end()
		.find(".none-ferry-expenses").on("change", function (){

			if ($(this).is(":checked")) {

				BF_scope.ferryExpanses = 0;
				clone.find(".ferry-price").val("").attr("disabled",true)

			} else {
				clone.find(".ferry-price").val("").attr("disabled",false)
			}

			BF_scope.updateView(BF_scope.jqueryElement.find(".calculation-pr-day"));

		})

	clone.appendTo($appendIn)
}

BF_manager.prototype.printBridge = function (type,$appendIn) {

	var BF_scope = this; 

	BF_scope[type] = {}

	var cloneStore 	= $(".copy-bridge-wrap").clone()
		
	cloneStore.find(".skts-btn-radio").each(function () {

		var token = "_Q" + generateUniqueToken(10),
			$this = $(this)

		$this
			.find("label").attr("for",token)
			.end()
			.find("input").attr("id",token)
			.end()

	});

	cloneStore.find(".skts-process-options").each(function () {

			var token = "_Q" + generateUniqueToken(10),
				$this = $(this)

			$this
				.find("input").attr("name",token)

		});


	if (type === "oresund") {

		cloneStore
			.find(".crossing").remove()
			.end()
			.find(".transport").removeClass("hidden")
			.find(".radio-label").text("Transportmiddel over Øresundsbroen");

		BF_scope.oresund.passages_pr_trip = BF_scope.google.bridgeCrossing.oresund;

	}

	if (type === "storebalt" && this.provider === "google") {

		cloneStore
			.find(".crossing").remove()
			.end()
			.find(".transport").removeClass("hidden")
			.find(".radio-label").text("Transportmiddel over Storebæltsbroen");

		BF_scope.storebalt.passages_pr_trip = BF_scope.BF_scope.google.bridgeCrossing.storebalt;

	}

	cloneStore
		.data("context",type)
		.removeClass("copy-bridge-wrap hidden")
		.addClass(type)
		.find(".form-group").each(function () {
			
			var name = "name_" + generateUniqueToken(6);
			
			$(this).find(".radio input").each(function () {
				$(this).attr("name",name)
			})
			
		})		
		.end()
		.find("input[type='radio'],.update-bind").on("change keyup", function () {

			var $this 		= $(this),
				context 	= $this.closest(".bridge-wrap").data("context"),
				typetrans 	= $this.data("info"),
				value 		= $this.val(),
				show		= $this.data("show"),
				hide 		= $this.data("hide")
						
			BF_scope[context][typetrans] = value;
			BF_scope.updateGui(show,hide,type); 
			BF_scope.setBridgeDeduction(type);
			BF_scope.updateView(BF_scope.jqueryElement.find(".calculation-pr-day"));

		})

	if (!BF_scope.checkFerry() && type === "storebalt") {

		BF_scope.printFerry(cloneStore)

		cloneStore.find(".ferry-costs").addClass("hidden")
			.end()
			.find(".crossing input[value='1'],.crossing input[value='2']").each(function () {

				$(this).data("hide",["ferry-costs"])

			})
			.end()
			.find(".crossing input").on("change", function () {

				var value = $(this).closest(".form-group").find(":checked").val();

				if (value === "1" || value === "2") BF_scope.ferryExpanses = 0;

				BF_scope.updateView(BF_scope.jqueryElement.find(".calculation-pr-day"));

			})

	} else {
		cloneStore.find(".crossing input[value='0']")
			.prop("checked",true)
			.closest("label").addClass("active")
	}

	cloneStore.appendTo($appendIn.find(".additional-area"))

}

BF_manager.prototype.updateGui = function (show,hide,within$) {

	var $this = this.jqueryElement

	if ($.isArray(show)) {
		
		show.forEach(function(v){

			var $ele = $this.find("." + within$ +  " ." + v);

			if ($ele.hasClass("hidden")) {
				$ele.removeClass("hidden").hide().slideDown(300)
			} 
		})
	}

	if ($.isArray(hide)) {
		
		hide.forEach(function(v) {
			$this.find("." + within$ +  " ." + v)
				.addClass("hidden")
				.find("input:checked")
				.each(function (){
					$(this).prop('checked', false);
				})
				.end()
				.find("input[type='number']").each(function (){
					$(this).val("")
				})
		})
	}
}

BF_manager.prototype.bridgeDeduction = function (type) {

	var bridge_obj 	= this[type],
		total 		= 0 

	if (bridge_obj) {

		var carDeduction	= (bridge_obj.car_passages) ? (bridge_obj.car_passages * this.satser[type].car) : 0,
			trainDeduction	= (bridge_obj.train_passages) ? (bridge_obj.train_passages * this.satser[type].train) : 0

		total = carDeduction + trainDeduction

	}

	if (total > 0) {

		return {
			total:total,
			car:carDeduction,
			train:trainDeduction
		}

	} else {
		return false
	} 
}

BF_manager.prototype.returnBridgeText = function (bridge) {

	var BF_scope = this;

	if (BF_scope[bridge])  {

		var s 		= BF_scope.bridgeDeduction(bridge),
			t 		= BF_scope[bridge],
			textArr = []

		if (s) {

			var text = (bridge === "storebalt") ? "Storebælt" : "Øresund"

			if (t.car_passages > 0) 	textArr.push("<span class='calculation'>" + text + ", bil/motorcykel: " + t.car_passages + " passager &#215 " + BF_scope.satser[bridge].car + " kr. </span><span class='pull-right'>" + s.car.digits() + " kr.</span>")
			if (t.train_passages > 0)	textArr.push("<span class='calculation'>" + text + ", tog: " + t.train_passages + " passager &#215 " + BF_scope.satser[bridge].train + " kr.</span><span class='pull-right'>" + s.train.digits() + " kr.</span>")
		
			return textArr

		} else {
			return false
		}	
	}
	else {
		return false
	}
}

BF_manager.prototype.returnFerry = function () {

	return ["<span class='calculation'>Færgeudgifter (hele perioden): </span> <span class='pull-right'> " + this.ferryExpanses.digits() + " kr.</span></div>"];


}

BF_manager.prototype.returnprDayText = function () {

	var prDay 			= this.fradrag_prDay(),
		totalRegular 	= this.fradragTotalNetto()

	totalRegular = (isNaN(totalRegular)) ? 0 : totalRegular.digits()
		
	return ["<span class='calculation'>Fradrag pr. dag: " + prDay.digits() + " kr. &#215 " + (this.numberTrips || "-") + " dage </span><span class='pull-right'> " + totalRegular + " kr.</span>"];
	
}

BF_manager.prototype.returnTotalline = function () {

	var total = (isNaN(this.returnTotal())) ? "-"  : this.returnTotal().digits();
	return ["<div class='total-sum '><span class='calculation'>Total: </span><span class='pull-right'> " + total + " kr.</span></div>"];
	
}

BF_manager.prototype.returnTotal = function () {

	var BF_scope = this;

	var bridges = ["storebalt","oresund"].reduce(function (p,v) {

		return (BF_scope[v]) ? (BF_scope.bridgeDeduction(v).total + p) : p 

	},0)

	var prDay 	= BF_scope.fradragTotalNetto(),
		ferry 	= (BF_scope.ferryExpanses > 0) ? BF_scope.ferryExpanses : 0,
		bridges = (bridges > 0) ? bridges : 0

	return (prDay + bridges + ferry)

}

BF_manager.prototype.updateView = function ($insetTo,total) {

	var textArr 	= [],
		BF_scope 	= this,
		showTotal	= false
		
	textArr.push(BF_scope.returnprDayText());
	
	["storebalt","oresund"].forEach(function (v) {

		var textArEle = BF_scope.returnBridgeText(v);

		if (textArEle) {
			textArr = textArr.concat(textArEle);
			showTotal = true
		}
	});

	if (BF_scope.ferryExpanses > 0) {

		textArr.push(BF_scope.returnFerry());
		showTotal = true;

	}

	if (showTotal && !(total === false)) textArr.push(BF_scope.returnTotalline())

	textArr = textArr.map(function (v) {return "<div class='clearfix'>" + v + "</div>"})
	textArr = textArr.join("")

	$insetTo.html(textArr)

}

BF_manager.prototype.createJqueryBFObject = function () {

	var BF_scope = this;

	var clone 	= this.jqueryElement	= $(".copy-bf").clone(),
		period 	= "<span class='bf-number-line pull-left'><span class='bf-number'>" + BF_scope.index + "</span>. kørselsforhold " + cal.text(this.from)[0] + " - " + cal.text(this.to)[0] + "</span>"


	if (this.generated) {

		var addressHtml = this.address.map(function (v,i) {
			var typeMarker = (i > 0) ? "A" : "H"   	
			return "<li class='alternative-list-style'><span class='address-abbr'>" + typeMarker + "</span> " + v + "</li>"
		})

	} else {
		this.insertManual(clone.find(".manual-area"))
	}
	
	clone
		.attr("id",this.id)
		.removeClass("copy-bf hidden")
		.addClass(this.id)
		.find(".distance-user").val(this.getDistance() || "")
		.end()
		.find(".transport-day").val(this.numberTrips || "")
		.end()
		.find(".address-holder").append(addressHtml || "")
		.end()
		.find(".panel-title").append(period || "")
		.end()
		.find(".update-bind").on("blur change keyup", function () {

			var type 	= $(this).attr("name"),
				input 	= Number($(this).val())

			if (input >= 0) {
			
				BF_scope[type] = Number($(this).val());
				
				["storebalt","oresund"].forEach(function (v) {			
					if (BF_scope[v]) BF_scope.setBridgeDeduction(v);
					
				})
				
				BF_scope.updateView_prday(clone.find(".calculation-pr-day-detailed"));
				BF_scope.updateView(clone.find(".calculation-pr-day")); 
			}
		})
		.end()
		.find(".calender-func").on("click", function () {

		  $("#kalenderModul").data("id",BF_scope.id) 
		  startCalender(BF_scope.calender)

		})


	if (this.generated) {
		this.updateTotal_newRoute()	/* here bridges,udkant and ferry are checked and if true added to clone   */

	} else {	

		clone.find(".address-holder").addClass("hidden")
			.end() 
			.find(".bf-main-input").addClass("hidden") 

	}

	return $(clone)
	
} 

BF_manager.prototype.updateTotal_newRoute = function (settings) {
	
	var scope = this;
	var $thisBF = this.jqueryElement
		
	$thisBF
		.find(".distance-user").val(this.getDistance());
	
	/* hvis nuværende storebælt og storebælt eksisterer prev og pre -> lav nyt st */
	if (this.checkstoreBalt() && (!(settings && settings.indexOf("storebalt") > -1))) {
		$thisBF.find(".storebalt").remove()
		this.printBridge("storebalt",$thisBF);
		this.setBridgeDeduction("storebalt");		
	} 
	
	if (!this.checkstoreBalt()) {
		if (this.storebalt) this.storebalt = {}
		$thisBF.find(".storebalt").remove();
	}

	if (settings && settings.indexOf("storebalt") > -1) {
		this.storebalt.passages_pr_trip = this.google.bridgeCrossing.storebalt;
		this.setBridgeDeduction("storebalt");	
	}
	
	if (this.udkantskommune && this.getDistance() > this.satser.kmLimit && (!(settings && settings.indexOf("udkant") > -1))) {
		this.printUdkant("",$thisBF.find(".additional-area"))
	}
	
	if (this.routeProvider() === "google" && this.google.bridgeCrossing.oresund > 0 && (!(settings && settings.indexOf("oresund") > -1))) {
		this.printBridge("oresund",$thisBF);
		this.setBridgeDeduction("oresund");	
	} 
	
	if (this.routeProvider() === "google" && this.google.bridgeCrossing.oresund === 0) {
		if (this.oresund) this.oresund = {}
		$thisBF.find(".oresund").remove();
	} 
	
	if (this.checkFerry() && (!(settings && settings.indexOf("ferry") > -1))) {
		this.printFerry($thisBF.find(".additional-area"))
	} 
	
	if (!this.checkFerry()) {
		$thisBF.find(".ferry-costs").remove();
		this.ferryExpanses = 0;
	}
	
	this.updateView_prday($thisBF.find(".calculation-pr-day-detailed"));
	this.updateView($thisBF.find(".calculation-pr-day"))

}

BF_manager.prototype.getCoordinatesForAddressMarkers = function () {

	if (this.routeProvider() === "google") {

		return this.google.googleDirectionObject.routes[0].legs.map(function (v) {
			return v.start_location
		})

	} else {

		return this.krak.addressInfo.map(function (v) {
			var c = v.coordinates;
			return {lat:c[1],lng:c[0]}
		})
	}
}

BF_manager.prototype.changetoGoogle =  function () {
	
	var scope = this;
	
	this.provider = "google";
	this.dk = false;
	this.proxiChanged = 0;	
	
	scope.address.pop()
	
	main.BF.initiateDistance([scope], function () {
			
		donttouch 	= ["udkant"]
		
		if (scope.checkstoreBalt() && scope.googleRouteObject.storebalt > 0) donttouch.push("storebalt");
		if (scope.krakRouteObject.oresund > 0 && scope.googleRouteObject.oresund > 0) donttouch.push("oresund");
		if (scope.checkFerry() && scope.google.ferry) donttouch.push("ferry");
		
		var difference 	= scope.krakRouteObject.distance - scope.googleRouteObject.distance,
			changeType 	= (difference < 0) ? "længere" : "kortere",
			difAbs		= Math.abs(difference)
		
		if (difference !== 0) BF_scope.jqueryElement.find(".route-changed").text("Ruten er ændret ift. den oprindelige rute. Ruten er " + difAbs + " km " + changeType + " end oprindelig rute.")
				
		scope.updateTotal_newRoute(donttouch);
		scope.showRelevantRoute();

	})
}

BF_manager.prototype.displayMap = function () {

	var $mapWrap = this.jqueryElement.find(".map-wrapper")
	
	$mapWrap.addClass("new-map")

	//$("#themap").appendTo(".bf-wrapper-area .bf-forhold .map-wrapper");
	$("#themap").appendTo($mapWrap);
	
	
	
	google.maps.event.trigger(main.map,'resize');

	if (this.routeProvider() === "krak") {

		var coordinates = this.krak.addressInfo.map(function (v) {
			var c = v.coordinates
			return {lat:c[1],lng:c[0]}
		})

		var mapData = this.krak.googleMapsDisplayData,
			bounds 	= mapData.LatLngBoundsForGM

		mapData.routeForGMpolyline.setMap(main.map); // displaying krak-route
					
	} else {
		
		var GM_display = this.google.directionsDisplay;
		
		GM_display.setDirections(this.google.googleDirectionObject); // displaying Google route
		GM_display.setMap(main.map)

		var bounds 		= GM_display.directions.routes[0].bounds,
			coordinates	= this.google.googleDirectionObject.routes[0].legs.map(function (v) {
			return v.start_location
		})

	}

	main.map.fitBounds(bounds); // settings bounds on map so the route is in center
	this.displayAddressMarkersOnMap(coordinates); // display addresses on map - custom	

}

BF_manager.prototype.displayAddressMarkersOnMap = function (coordinates) {

	this.addressMarkersShown = coordinates.map(function (v,i) {
		
		return new google.maps.Marker({
			position:v,
			map: main.map,
			label:(i > 0) ? "Arbejdsplads" : "Hjem",
			title: '',
			zIndex:99999999
		}); 
	})

}


BF_manager.prototype.createKrakMap = function ($appendTo) { /* not used - shows Krak map */

	var coord = this.krakRouteObject.addressesCordinates.reduce(function (p,v) {
		return p.concat(v.join(","))
	},[]).join(";");

	var box 		= this.krakRouteObject["route-geometries"].structuredBBox,
		boxstring 	= box.maxX + "," + box.maxY + ";" + box.minX + "," + box.minY 

	$(".test-krak-map").append("<img src='http://kartor.eniro.se/api/statmap?iformat=image/png&bbox=" + boxstring +  "&iwidth=640&iheight=480&scale=2&itype=map&wp=" + coord  + "' height='350' width='100%'/>")

}


/* 

two public methods fetching distance from GoogleDirection and Krak. The response objects can be placed on the an optional object paramter, so that's traceable
	
	- getGoogleDirection(object to enrich with google Direction data placed in object as property google or just empty object,fn [fn looking for in the object] or array [addresses])
	- getKrakDirection()

*/

function getGoogleDirectionClass () {

	var directionsService = new google.maps.DirectionsService();

	return function (addresses,BF_Object) {
	
		var def					= new $.Deferred(),
			actionType 			= typeof addresses,
			BF_Object 			= BF_Object || {},
			addressToCalculate	= (actionType === "function") ? addresses.call(BF_Object) : addresses, /* Can be function looking in the object passed in or a hardcoded array */
			googleCall 			= formateToGoogleSendParameter(addressToCalculate)
	
		directionsService.route(googleCall,function (response,status) {

			setGoogleObject(BF_Object,response,status).then(function (data) {
				def.resolve(data)
			})	
		});
		
		return def.promise()
	}

	function setGoogleObject (BF_Object,response,status) {

		var def = $.Deferred()

		var success = (status == google.maps.DirectionsStatus.OK) ? true : false
		
		if (success) {
		
			var ferryDistanceLegs 	= ferryDistance(response),
				fullAddress 		= getFullAddressses(response),
				addressMeta_ 		= getaddressMeta(fullAddress);
				
			if (BF_Object.dk) {
				
				getKommunes(addressMeta_).then(function (data) {

					var addressInfo = addressMeta_.map(function (v,i) {
						v.kommune = data[i]
						return v
					})
					
					BF_Object.google = BF_Object.googleOriginal = writePropertiesToObject(BF_Object,response,ferryDistanceLegs,addressInfo)
					
					def.resolve(BF_Object)			
						
				})
			
			} else {
			
				BF_Object.google = BF_Object.googleOriginal = writePropertiesToObject(BF_Object,response,ferryDistanceLegs,addressMeta_)
				def.resolve(BF_Object)	
				
			}
		
		} else {
		
			BF_Object.google = {
				success:false		
			}

			def.resolve(BF_Object)		
		}

		return def.promise()

	}
	
	function writePropertiesToObject (BF_Object,response,ferryDistanceLegs,addressInfo) {
	
		return {
			success:true,
			googleDirectionObject:response,
			bridgeCrossing:getBridgeCrossings(response),
			distance:bruttoDistance(response,ferryDistanceLegs),
			ferry:checkferry(ferryDistanceLegs),
			directionsDisplay:setDirectionsDisplay(BF_Object),
			addressInfo:addressInfo
		}
	}

	function formateToGoogleSendParameter (addressesFromAtoB) {
				
		var o = {},	
			len = addressesFromAtoB.length;
		
		o.origin 		= addressesFromAtoB[0];
		o.destination 	= addressesFromAtoB[len-1];
		o.travelMode 	= google.maps.TravelMode.DRIVING;

		if (len > 2) {
			
			o.waypoints = addressesFromAtoB.slice(1,len-1).map(function (v) {		
				return {
					location:v,
					stopover:true
				}		
			})	
		}	
		
		return o	
	}
	
	function getBridgeCrossings (googleObject) {
		
		return googleObject.routes[0].legs
			.map(function (v) {
				return v.steps.reduce(function (p,v) {
					return p.concat(v.path.map(function (v) {
						return [v.lat(),v.lng()] 
					}))
				},[])
			})
			.reduce(function (p,v) {
				if (v.find(function (v) {
					if (v[0] > 55.54 && v[0] < 55.6 && v[1] > 12.72 && v[1] < 12.83) return true
				})) p.oresund = ++p.oresund
				
				if (v.find(function (v) {
						if (v[0] > 55.33 && v[0] < 55.35 && v[1] > 10.99 && v[1] < 11.02) return true
					})) p.storebalt = ++p.storebalt

				return p; 

			},{oresund:0,storebalt:0})

	}

	function ferryDistance (googleObject) {

		return googleObject.routes[0].legs
			.map(function (v) {
				return v.steps.reduce(function (p,v) {
					return (v.maneuver === "ferry") ? p + v.distance.value : p
				},0)
			})

	}

	function checkferry (ferryDistanceLegs) {

		return !!ferryDistanceLegs.reduce(function(p,v) {
			return p+v
		},0)
	}

	function bruttoDistance (googleObject,ferryDistanceLegs) {

		return googleObject.routes[0].legs
			.map(function (v) {
				return v.distance.value
			})
			.map(function (v,i) {
				return [v,ferryDistanceLegs[i]]
			})
			.reduce(function(p,v) {
				return p + Math.ceil((v[0] - v[1])/1000)
			},0)
	}

	function getKommunes (addressesMeta) {

		var def = $.Deferred()

		var promises = addressesMeta.map(function (v) {
			return getKommune(v.vejnavn,v.vejnummer,v.postnr)
		})

		$.when.apply($,promises).then(function () {
			var addressData = Array.prototype.slice.call(arguments);
			def.resolve(addressData)
		})

		return def.promise()
	}

	function getKommune (vejnavn,husnr,postnr) {

		var def = $.Deferred();

		var dawaCall = $.ajax({url:"http://dawa.aws.dk/adresser?vejnavn=" + encodeURIComponent(vejnavn) + "&husnr=" + husnr + "&postnr=" + postnr,dataType:"jsonp"})
			.then(function (data) {
				def.resolve(data[0].adgangsadresse.kommune.navn)
			})

		return def.promise()
	}

	function getFullAddressses (googleObject) {

		return googleObject.routes[0].legs.map(function (v) {
			return v.start_address
		})
	}

	function getaddressMeta (addresses) {

		function getFirstMatch (split) {
			return (split) ? split[0] : false
		}		

		return addresses.map(function (v) {
	
			var addressMeta = v.split(","),
				vejnavn 	= $.trim(getFirstMatch(addressMeta[0].match(/^[^0-9]+/))),
				vejnr 		= getFirstMatch(addressMeta[0].match(/\d{1,3}/)),
				postnr 		= getFirstMatch(addressMeta[1].match(/\d{4}/))
				
			if (!vejnr) vejnr = 5
		
			return {
				vejnummer:vejnr,
				vejnavn:vejnavn,
				postnr:postnr
			}

		})
	}

	function setDirectionsDisplay (BF_Object) {

		var directionsRender = new google.maps.DirectionsRenderer({draggable: true});

		directionsRender.setMap(main.map);
		directionsRender.addListener('directions_changed', function() {

			var newGoogleDirectionObject 	= BF_Object.google.directionsDisplay.getDirections(),
				google						= BF_Object.google,
				ferryDistanceLegs 			= ferryDistance(newGoogleDirectionObject),
				new_bridgeCrossing 			= getBridgeCrossings(newGoogleDirectionObject),
				new_distance 				= bruttoDistance(newGoogleDirectionObject,ferryDistanceLegs),
				new_ferry 					= checkferry(ferryDistanceLegs),
				storebalt_ExitsBoth 		= google.bridgeCrossing.storebalt === new_bridgeCrossing.storebalt && new_bridgeCrossing.storebalt > 0,
				oresund_ExitsBoth 			= google.bridgeCrossing.oresund === new_bridgeCrossing.oresund && new_bridgeCrossing.oresund > 0,
				ferry_ExitsBoth				= google.ferry === new_ferry && new_ferry
			
			var donttouch = [["storebalt",storebalt_ExitsBoth],["oresund",oresund_ExitsBoth],["ferry",ferry_ExitsBoth]]
				.filter(function (v){
					if (v[1]) return true		
				})
				.map(function (v){
					return v[0]
				})
			
			google.googleDirectionObject	= newGoogleDirectionObject;
			google.bridgeCrossing 			= new_bridgeCrossing;
			google.distance 				= new_distance;
			google.ferry					= new_ferry;
				
			BF_Object.setDistance()
			BF_Object.udkantskommuneCheck();	
			BF_Object.updateTotal_newRoute(donttouch);

		})

		return directionsRender

	}
} 

var getGoogleDirection = getGoogleDirectionClass() // getKrakDirection() now instantiated, call it with a BF_obejct with address property 


function getKrakDirectionClass () {

	return function (addresses,BF_Object) {

		var def					= new $.Deferred(),
			actionType 			= typeof addresses,
			BF_Object 			= BF_Object || {},
			addressToCalculate	= (actionType === "function") ? addresses.call(BF_Object) : addresses; /* Can be function looking in the object passed in or a hardcoded array */
			
		var addressPromises = addressToCalculate.map(function(v) {

			var addressObj = convertToAddressObject(v);
			return $.ajax({url:"http://dawa.aws.dk/adresser?vejnavn=" + encodeURIComponent(addressObj.vejnavn) + "&husnr=" + addressObj.husnr + "&postnr=" + addressObj.postnr,dataType:"jsonp"})		
		})

		$.when.apply($,addressPromises).done(function () { 

			var addressData = Array.prototype.slice.call(arguments);

			var addressInfo = addressData.map(function (v,i) {

				var resulObj 	= v[0][0].adgangsadresse,
					address 	= (BF_Object.address) ? BF_Object.address[i] : addresses[i];

				return {
					address:address,
					coordinates:resulObj.adgangspunkt.koordinater,
					postnr:resulObj.postnummer.nr,
					kommune:resulObj.kommune.navn
				}
			})

			var addressInfoCorrected = addressInfo.slice(0,-1)

			var coordinates = addressInfo.map(function (v) {
				return v.coordinates.join()
			}).join(";")

			$.ajax({url:"http://map.krak.dk/api/route?waypoints=" + coordinates + "&lang=dk&contentType=json",dataType:"jsonp"}).then(function(data) {

				BF_Object.krak = { /* enriching original fn parameter with direction, maybe return shallow copy?  */ 
					krakDirectionObject:data,
					addressInfo:addressInfoCorrected,
					distance:getKrakDistance(data),
					ferry:data["ferry-time"] > 0,
					success:validKrakResult(data),
					googleMapsDisplayData:{
						routeForGMpolyline:getCoordinatesForGoogleMapDisplay(data),
						LatLngBoundsForGM:getGoogleBounds(data)
					}
				}

				def.resolve(BF_Object)
			})
		})

		return def.promise()
	}

	function validKrakResult (krakObj) { // Checks if krak returns valid results. Some addresses won't work.

		if (krakObj["route-instructions"].length === 0) {
			return false

		} else {
			
			if (krakObj["route-instructions"].find(function (v) {return (v.features.length === 0)})) {
				return false
			} else {
				return true
			}			
		}
	}

	function getKrakDistance (krakObj) {

		var pathArray = krakObj["route-geometries"].features;

		var distanceNormal = pathArray.reduce(function (p,v) {
			return p + Math.ceil(v.properties.length/1000)
		},0)

		return (krakObj["ferry-time"] > 0) ? distance_path = totalNettoDistance(krakObj["route-instructions"]) : distanceNormal     
	}

	function totalNettoDistance (instruction) {

		var array = [],
			scope = this

		return Math.ceil(instruction.reduce(function (pre,v) {

			return pre + getNettoDistance(v)

		},0)/1000)

		function getNettoDistance (arr) {
		
			return arr.features.reduce(function (pre,v) {

				var a = v.properties

				if (a.instruction) {
					var p = (/, kør\s(\d+\.*\d*)\s(\w+)/).exec(a.instruction) 

					if  (p) {

						if (p[2] === "km") {
							return pre + Number(p[1]) * 1000;

						} else if (p[2] === "m") {
							return pre + Number(p[1])
						} 

					} else {
						return pre
					}

				} else {
					return pre
				}
				
			},0)
		}
	}

	function getCoordinatesForGoogleMapDisplay (krakObj) {

		var route = krakObj["route-geometries"].features
			.reduce(function (p,v) {
				return p.concat(v.geometry.coordinates[0])
			},[])
			.map(function (v) {
				return {
					lat:v[1],
					lng:v[0]
				}		
			})

		return new google.maps.Polyline({
			path:route,
			geodesic: true,
			strokeColor: '#000033',
			strokeOpacity: 1.0,
			strokeWeight: 2
		})

	}

	function getGoogleBounds (krakObj) {

		var position 	= krakObj["route-geometries"].bbox;
		
		var	makeNumber 	= position.map(function (v) {		
				return Number(v)	
			})
		
		var sw = new google.maps.LatLng(makeNumber[1], makeNumber[0]),
			ne = new google.maps.LatLng(makeNumber[3], makeNumber[2])

		return new google.maps.LatLngBounds(sw,ne)

	}

	function convertToAddressObject (address) {
		
		var vejnummer 		= address.match(/\d{1,3}\w?/),
			vejnavn 		= /^[^0-9]+/.exec(address),
			postnummer 		= address.match(/\d{4}/),
			by 			= /\d{4},?\s?(.+)/.exec(address),
			by_alt 			= /\d+\s?,?\s?\d*\s?(.+)/.exec(address)
		
		vejnummer = (vejnummer) ? vejnummer[0] : null;
		vejnavn = (vejnavn) ? vejnavn[0] : null;
		postnummer = (postnummer) ? postnummer[0] : null;
		by = (by) ? by[1] : null;
		//by = (!by && by_alt) ? by_alt[1] : null;   


		return  {
			vejnavn:$.trim(vejnavn),
			husnr:vejnummer,
			postnr:postnummer,
			by:by
		}
	}
}

var getKrakDirection = getKrakDirectionClass() // getKrakDirection() now instantiated, call it with a BF_obejct with address property 


function getDirectionsAll (BF_forholdKrakArray) {

	var def = $.Deferred()

	var google = BF_forholdKrakArray.filter(function (v) {
		return (v.dk === false) ? true : false
	})

	var krak = BF_forholdKrakArray.filter(function (v) {
		return (v.dk === true) ? true : false
	})
	
	var googles = getGoogleDirections(google),
		kraks 	= (krak.length > 0) ? getKrakDirections(krak) : null

	$.when(googles,kraks).then(function (googles,kraks) {
	
		/* we need to check and mark in the BF_obejct whether udkantskommune applies. And catch satser. Both methods sets properties on the object  */
		BF_forholdKrakArray.forEach(function (BF_forhold) {
			BF_forhold.getSatser();
			BF_forhold.udkantskommuneCheck();
			BF_forhold.setDistance()
		})
		
		def.resolve(googles,kraks)
	})

	return def.promise()
}

function getGoogleDirections (BF_forholdKrakArray) {

	var def = new $.Deferred()

	var googlepromises = BF_forholdKrakArray.map(function (v) {

		return getGoogleDirection(function () {
			return this.getReturnRouteAddresses()
		},v)
	
	})

	$.when.apply($,googlepromises).then(function () {

		var addressData = Array.prototype.slice.call(arguments);	
		def.resolve(addressData)

	})

	return def.promise()
}

function getKrakDirections (BF_forholdKrakArray) {

	var def = new $.Deferred()

	var krakpromises = BF_forholdKrakArray.map(function (v) {

		return getKrakDirection(function () {
			return this.getReturnRouteAddresses()
		},v)
	
	})

	var allkrak = $.when.apply($,krakpromises).then(function () {

		var addressData = Array.prototype.slice.call(arguments);

		var krakFails = addressData.filter(function (v) {
			return (!v.krak.success) ? true : false  
		})

		if (krakFails.length > 0) { // sometimes krak doesn't return results at all or partly, which they don't mark as failure. Therefore Google needs to calculate these objects

			var promises = krakFails.map(function (v) {
				return getGoogleDirection(function () {
					return this.getReturnRouteAddresses()
				},v)
			})

			$.when.apply($,promises).done(function () {

				var googleCorrectedResults = Array.prototype.slice.call(arguments);

				googleCorrectedResults.forEach(function (v) { // don't need krak when it fails Absalonsgade 38, 5000 Odense as example
					delete v.krak
				})				

				addressData.concat(googleCorrectedResults); 
				def.resolve(addressData);

			})

		} else {

			def.resolve(addressData)
		}
	})

	return def.promise()

}

function findHighest (arr) {
	return arr.reduce(function (v,p) {
		return (v > p) ? v : p
	},0)
}

function findLowest (arr) {
	return arr.reduce(function (v,p) {
		return (v < p) ? v : p
	},0)
}

function MainControl () {

	var scope = this;

	this.year = Number($("#year").val());
	this.bf_storage = [];
			
	var init = function () {

		$(".befordring-wrapper input[type='text']").each(function () {
			$(this).val("")
		})
				        
		var aar,
			FormState = "SetYear"
			
		$("#prevStep").addClass("hidden")
		
		var stateManeger = {
		
			setYear:{
				forward:"bopael",
				back:null,
				heading:"Vælg år",
				actions:function (callback) {
					deleteSettings();			
					setTimeout(callback,300)					
				}		
			},
			bopael:{
				forward:"jobadresser",
				back:"setYear",
				heading:"Bopælsadresser",
				subtext:"Hvor har du boet i løbet af året?", 
				actions:function (callback) {
				
					/* first sets year and then removes existing calenders and bind new calenders  */
				
					main.year = Number($("#setYear input:checked").val())
					main.setYearDom();
					deleteCalenderBindings();
					bindNewCalender($(".address-periods").not(".copy-element"))
					setTimeout(callback,300)								
				}		
			},
			jobadresser:{
				forward:"visBefordringsfradrag",
				back:"bopael",
				heading:"Arbejdsadresser",
				subtext:"Indtast alle dine arbejdsadresser du har kørt til i løbet af året.", 

				actions:function (callback) {
					$("#themap").appendTo(".map-wrap");
					$(".bf-wrapper-area").html("");
					stateManeger.subFunctionsCall.moreBF.clearMap()
					main.bf_storage = [];
					setTimeout(callback,300)		
				}		
			},
			visBefordringsfradrag:{
				forward:"visResultat",
				back:"jobadresser",
				subtext:"",
				actions:function (callback,move) {
									
					if (move === "forward") {
										
						var addressData 		= getAddresses_periodsFromDom(),
							befordsforholdClass = new BefordringsForhold({job:addressData.job,home:addressData.home,year:main.year}),
							self 				= this
							
						if (scope.bf_storage.length > 0) {
							
							this.initiateBF(main.bf_storage,callback)

						} else if (befordsforholdClass.checkifJobOoverlap()) {
						
							self.heading = "Dine ruter/kørselsforhold"

							setTimeout(callback,300)				
							setTimeout(function () {
								stateManeger.updateItem("extraStep","forward")
							},0)
								
						} else {
						
							var normal = befordsforholdClass.getNormal_()
							this.initiateBF(normal,callback)
							
						}

					} else {
					
						callback();
						
						stateManeger.subFunctionsCall.moreBF.MapInBF = 0
						stateManeger.subFunctionsCall.moreBF.clearMap()
						stateManeger.subFunctionsCall.moreBF.printAll_Bf();
						
					}
				},
				initiateBF: function (bf,callback) {
				
					var self = this;
				
					getDirectionsAll(bf).then(function () { // DISTANCE CALLS via GETDIRECTION 
						
						self.heading	= "Kørselsforhold"
						
						callback();
						stateManeger.subFunctionsCall.moreBF.clearMap()
						stateManeger.subFunctionsCall.moreBF.init(bf); //initiating states and show first BF forhold
																	
					})
					
				}
			},
			extraStep:{
				forward:"visBefordringsfradrag",
				back:"jobadresser",
				subtext:"",
				actions:function (callback) {
					
					setTimeout(callback,300)
				}

			},
			visResultat:{
				forward:null,
				back:"visBefordringsfradrag",
				subtext:"",
				actions:function (callback) {
					stateManeger.subFunctionsCall.moreBF.printTotal()
					setTimeout(callback,300)
				}
			},
			subFunctionsCall:{
				
				moreBF:{
					action:function (direction) {

						$(".loading").removeClass("hidden");
						$(".main-step").addClass("hidden");

						this.BFShown = (direction === "forward") ? ++this.BFShown : --this.BFShown

						if (this.BFShown >= 0 && this.BFShown <= this.BF_number-1) {

							var self = this;

							setTimeout(function () {
								$("#visBefordringsfradrag").removeClass("hidden");
								$(".loading").addClass("hidden");
								self.showBFNumber(self.BFShown);
							},300)


						} else if (this.BFShown < 0 || this.BFShown == this.BF_number) {
	
							stateManeger.mainState = true 	

							var state = stateManeger.actualController[direction]
							stateManeger.updateItem(state)
							$(".main-step").addClass("hidden"); /* skjuler alle hoved-divs  */
							
							this.clearMap();
							
							if (this.BFShown == this.BF_number) --this.BFShown

						} 
					},
					init:function (BFArray) {

						$("#visBefordringsfradrag").removeClass("hidden");

						this.BFShown = 0;
						this.MapInBF = 0;
						this.BF_number = BFArray.length;
						this.BF_storage = BFArray;
						//this.showBFNumber(0);
						this.printAll_Bf();
						
						$(window).on("scroll", this.moveMapDynamically)
						

					},
					BFShown:0,
					MapInBF:0,
					prevPosition:$(window).height(),
					getBreakPoints: function () {
						$(".bf-forhold .address-holder").each(function () {
							var pxFromTop = $(this).offset().top
						})
					
					},
					moveMapDynamically: function () {
					
						var breaks 		= [],
							location	= stateManeger.subFunctionsCall.moreBF
					
						$(".bf-forhold .address-holder:visible").each(function () {
							var pxFromTop = $(this).offset().top;
							breaks.push(pxFromTop)		
						})
											
						var mapPositionPxFromTop 	= $("#themap").offset().top,
							windowHeight 			= $(window).height(),
							pxFromTop 				= $(document).scrollTop(),
							margin 					= 200,
							topBorder				= margin,
							bottomBorder 			= windowHeight - margin,
							current 				= location.MapInBF,
							oldPosition 			= location.prevPosition,
							direction 				= (pxFromTop > oldPosition) ? "down" : "up",
							userArea 				= breaks.map(function (v) {
								return (direction === "down") ? (v-bottomBorder) : (v-50)
							}),
							crossing 				= userArea.reduce(function (p,v,i) {					
								var inbetween = ((oldPosition <= v && pxFromTop >= v) || (pxFromTop <= v && oldPosition >= v))
								return (inbetween) ? i : p

							},false),
							shouldMapChange			= (crossing !== false && crossing !== current)

						if (shouldMapChange) {

							$(".bf-wrapper-area .map-wrapper").removeClass("new-map")

							location.clearMap()
							location.BF_storage[crossing].jqueryElement.find(".map-wrapper").addClass("new-map")
							location.BF_storage[crossing].displayMap();
							location.MapInBF = crossing

						}
						
						location.prevPosition 	= pxFromTop 
						
						
					},
					createGoogleMap: function (ele) {
	
						var customMapType = new google.maps.StyledMapType([
							  {
								stylers: [
								  {hue: '#708090'},
								  {visibility: 'simplified'},
								  {gamma: 0.5},
								  {weight: 0.5}
								]
							  },
							  {
								featureType: 'water',
								stylers: [{color: '#FFFFFF'}]
							  }
							], {
							  name: 'Custom Style'
						  });

						var customMapTypeId = 'custom_style';
						
						var mapOptions = {
							center: { lat: 58, lng: 7},
							zoom: 6,
							mapTypeControlOptions: {
								mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
							}
						};
						
						var map = new google.maps.Map(ele,mapOptions);
									
						map.mapTypes.set(customMapTypeId, customMapType);
						map.setMapTypeId(customMapTypeId);
						
						return map
					},
					fixedCalculation:false,
					showBFNumber:function (number) {

						// safe map relocate
						$("#themap").appendTo(".map-wrap")
						$(".bf-wrapper-area").html("")

						var BF_object 	= this.BF_storage[number],
							$BF			= BF_object.createJqueryBFObject();
						
						$(".bf-wrapper-area").append($BF)
						google.maps.event.trigger(main.map, 'resize');
						this.clearMap();
						BF_object.displayMap();
																	
					},
					printAll_Bf: function () {
						$("#themap").appendTo(".map-wrap");
						$(".bf-wrapper-area").html("");
						this.BF_storage.forEach(function (v,i) {
						
							var $BF	= v.createJqueryBFObject();
							$(".bf-wrapper-area").append($BF);
							
							if (i === 0) v.displayMap();
							
						})
					},
					clearMap:function () {
						
						if (this.BF_storage) {
							this.BF_storage.forEach(function (v) {		
								if (v.krak && v.krak.googleMapsDisplayData.routeForGMpolyline) v.krak.googleMapsDisplayData.routeForGMpolyline.setMap(null)
								if (v.addressMarkersShown) v.addressMarkersShown.forEach(function(v) {
									v.setMap(null)
								})

								if (v.google && v.google.directionsDisplay) v.google.directionsDisplay.setMap(null)		
							})
									
						}				
					},
					getTotalofAll:function  () {

						return this.BF_storage.reduce(function (p,v) {
							return v.returnTotal() + p
						},0)

					},
					printTotal:function () {

						var wrap = $("<div class='result-unit'></div>")

						this.BF_storage.forEach(function (v,i) {

							var $clone  	= $(".copy-result").clone().removeClass("copy-result hidden"),
								addresslist = v.address.map(function (v,i) {
										var type = (i === 0) ? "Fra: " : "Til: " 
										return "<li class='alternative-list-style'>" +  type + v + "</li>"
									}) 
							$clone.find(".addresses ul")
								.html(addresslist).end()
								.find(".panel-title").text((i + 1) + ". kørselsforhold")


							v.updateView($clone.find(".line"),false)
							$clone.appendTo(wrap)

						})

						$(".result-wrap").html("");
						wrap.appendTo(".result-wrap")
						
						$(".total-bf").text(this.getTotalofAll().digits() + " kr.")
					}
				}
	
			},
			actualController:{},
			bf_storage:null,
			bf_single_catch:null,
			updateItem:function (newState,move) { // This fn calls specific actions on specific steps and when callback hits updates GUI	

				var self = this;
				
				if (self[newState]) { 

					if (self[newState].actions) {
													
						self[newState].actions(function (state) { /* hvis action er asynk sætter forward/back først efter action er udført og callback kaldt   */					
					
							$(".loading").addClass("hidden");

							$(".skts-navbar-wizard li").each(function () {
								$(this).removeClass("active")
							})

							$(".main-heading").text(self[newState].heading);

							var sub = self[newState].subtext || ""

							$(".sub-heading").text(sub);

							$(".skts-navbar-wizard").find("." + newState).addClass("active")
							$("#" + newState).removeClass("hidden");

							self.toggleHidden($("#prevStep"),self[newState].back);
							self.toggleHidden($("#nextStep"),self[newState].forward);
							
						},move)		
					}
					
					self.actualController = self[newState] /* Sætter ny "controller"  hvordan er forward og back defineret her */	

				}
			
			},
			toggleHidden: function (ele,condition) { // if condition is true then element is shown

				ele[condition ? "removeClass" : "addClass"]("hidden")

			},
			checkbasic: function () {

				var failed = []

				$(".befordring-wrapper [data-toggle='buttons']:visible").each(function () {

					if (!$(this).find("input:checked").length) {
						failed.push($(this));
						$(this).data("failureType","check");
					}
				})
				
				$("input[type='number']:visible,.befordring-wrapper input[type='text']:visible").each(function () {

					if (!$(this).val().length) {		
						failed.push($(this));
						$(this).data("failureType","input");
					}
				})
				
				$(".dawa-search:visible").each(function () {
						
					if (!$(this).hasClass("dawa-ok") && $(this).val().length > 0) {
						failed.push($(this));
						$(this).data("failureType","unauthoriziced_address");
					}
				
				})
				
				return failed	

			},
			printFailed: function (failed) {

				var lookupText = {
					input:"Du har ikke udfyldt ovenstående felt.",
					check:"Du skal vælge én af ovenstående muligheder",
					unauthoriziced_address:"Adressen ser forkert/mangelfuld ud. Du skal vælge en af de adresser der foreslås når du skriver i feltet"
				}

				failed.forEach(function (v) {			

					var failedType 	= v.data("failureType"),
						text 		= lookupText[failedType]
						
					$(v).after("<div class='failed-message'><p>" + text + "</p></div>")
					
				})

			},
			UIBinding:function () {
			
				var self = this;	
				this.actualController = this.setYear;
				
				$("[data-move]").on("click", function () {

					var move = $(this).data("move");

					var failed = self.checkbasic()
					$(".failed-message,.address-input-info").remove()

					if (failed.length > 0 && move === "forward") {

						self.printFailed(failed)

					} else { // everthing is ok

						if (self.mainState) {

							$(".main-step").addClass("hidden"); /* skjuler alle hoved-divs  */
							$(".loading").removeClass("hidden");
							$(".sub-heading").html("");
							$(".main-heading").html("");
						
							var newState = self.actualController[move] 
							self.updateItem(newState,move) //newState is just a string pointing at det next action block 													
									
						} else {
							
							self.subFunctionsCall[self.subRutine].action(move)

						}
					}
					
					return false
					
				})
				
				$("input:not('#nextStep')").on("keyup change click", function () {
					$(".failed-message,.address-input-info").remove()
				})
				
				$("#frmMain").off();
				
				
			},
			mainState:true,
			subState:""
		}
		
		stateManeger.UIBinding()
		
		var year = 2016
		
		$(".home-period input").on("change", function () {

			var id = $(this).attr("id")
			if (id !== "periodEntireYear") $(".add-bopael").removeClass("hidden");

			/* skal tjekke om der er mere end 1 boapel i wrapper  */                   
		})
			
		$(".part-whole-year input").on("change", function () {
						
			if ($(this).val() === "partialYear") {
				
				$(this).closest(".address-periods").find(".js-date-picker-fixed-year").each(function () {			
					$(this).val("")	
				})
					
			} else {
			
				$(this).closest(".address-periods").find(".date-from").val("01-01-" + main.year)
				$(this).closest(".address-periods").find(".date-to").val("31-12-" + main.year)			
			}
		})
			
		$(".add-address").on("click", function () {

			var $copy 	= getCloneOf("copy-prototype"),
				type 	= $(this).closest(".add-address").data("type")

			$copy.data("type",type)
			$("." + type + "-wrapper").append($copy)
			bindNewCalender($copy) /* needs to be handled when visible */
			
			//$copy.find(".address").dawaautocomplete();	
			attachAutoAddress($copy.find(".address"),"dawa")

			$copy.find(".abroadAddress").on("change",autosuggestEvent);
			if (type === "job") $copy.find(".js-only-in-home").remove() 
			
			insertAddressNumbers(type);
			deleteAddressCreate($copy)

			return false

		})
		
		$(".part-whole-year input").on("change", function () {
			
			var action = ($(this).closest(".part-whole-year").find(":checked").hasClass("open-below")) ? "removeClass" : "addClass"
			
			$(this).closest(".well").find("[data-show-id]")[action]("hidden");
		
		})
		
		

		function insertAddressNumbers (type) {

			var addresses = $(".address-periods:visible")

			if (addresses.length > 1) {

				$(".address-periods:visible").each(function (i) {

					var _type = (type === "job") ? " arbejdspladsadresse" : " bopælsadresse"
					$(this).find(".label-title").text("#" + (i+1) + _type)

				})

			} else {

				$(".address-periods:visible").each(function () {

					var _type = (type === "job") ? "Din arbejdspladsadresse" : "Din bopælsadresse"
					$(this).find(".label-title").text(_type)
					
				})
			}
		}
		
		function bindNewCalender ($addedElement) { /* skal kaldes efter dom er kopieret */

			var a = main.year;
					
			$addedElement.find(".date-ele").each(function() {
				
				var b=$(this).attr("id"),
					c={};
				$(this).attr("maxlength","10"),
				c[b]="%d-%m-%Y",
				datePickerController.createDatePicker({
					formElements:c,
					highlightDays:[0,0,0,0,0,0,0],
					rangeLow:a+"0101",rangeHigh:a+"1231"

				})
			})

		}

		function deleteAddressCreate (ele) { // adds a close possiblity to each added address

			var slet = $("<a href='#' class='delete-address'>slet</a>"),
				type = $(this).data("type")

			slet.appendTo(ele)
				.on("click", function () {
					$(this).closest(".address-periods").remove();
					insertAddressNumbers(type)
					return false
				})

		}
				
		function getCloneOf (copyClassEle) {
		
			var clone = $("." + copyClassEle).clone().removeClass(copyClassEle + " hidden copy-element")
			
			/* handles need for unique id's and for's, pre-name-fixed */
			clone.find("[id]").each(function () {
		
				var uniquePrefix 	= generateUniqueToken(8),
					protoID 		= $(this).attr("id"),
					labelForEle 	= clone.find("[for='" + protoID + "']"),
					newID			= protoID + "_" + uniquePrefix 
				
				$(this).attr("id",newID)
				labelForEle.attr("for",newID)
						
			})	
			return clone
			
		}
		
		function autosuggestEvent () {
		
			var addressWrap = $(this).closest(".address-periods").find(".address-wrapper"),
				copy 		= addressWrap.find(".address-container").clone(),
				addressEle 	= copy.find(".address")
		
			/* should we use google or dawa for autosuggest? Elements are removed manually because  */
			if ($(this).is(":checked")) {
				attachAutoAddress(addressEle,"google");
				
			} else {
				attachAutoAddress(addressEle,"dawa");
			}
						
			addressWrap.find(".address-container").remove();
			copy.appendTo(addressWrap);
			addressEle.val("");	
			
		}
		
		$("#bopael .abroadAddress").on("change",autosuggestEvent);
		

		function attachAutoAddress (ele,type) {
		
			ele.removeClass("dawa-search")

			if (type === "dawa") {

				ele
					.dawaautocomplete({
							select: function(event, data) {
								ele.addClass("dawa-ok")	
								ele.removeClass("ui-autocomplete-loading")
								$(".address-input-info").remove();
							} 
						})
					.addClass("dawa-search")
					.on("keyup", function (e) {
						$(".address-input-info").remove();
						
						if ($(this).val().length > 2 && e.which !== 13) {
							$(this).after("<p class='address-input-info'>Du skal vælge en de af forelåede adresser</p>")
							$(this).removeClass("dawa-ok")
						}
						
					})

			} else {

				new google.maps.places.Autocomplete(ele[0])

			}
		}
		
		function deleteSettings () {
		
			$(".address-periods").each(function () {
			
				var yearValg = $(this).find(".part-whole-year")
					
				yearValg.find(":checked").prop("checked",false)
				yearValg.find(".btn").removeClass("active")
				$(this).find(".abroadAddress").prop("checked",false)
				
			})
			
			$(".date-ele").each(function () {
				$(this).val("");
			})
			
			$(".address").each(function () {
				autosuggestEvent($(this))
			})
			
			
	
		}
		
		function deleteCalenderBindings () {

			$(".date-ele").each(function () {

				var id = $(this).attr("id")
				datePickerController.destroyDatePicker(id)

			})
		}
		
		$(".address-dk").each(function () {	
			attachAutoAddress($(this),"dawa")
		})
		

		function getAddresses_periodsFromDom () {
		
			var build = {
				"job":[],
				"home":[]
			}

			$(".address-periods").not(".copy-element").each(function (i) {

				var $this   = $(this),
					type    = $this.data("type"),
					address	= $this.find(".address").val(),
					from 	= translateDate($this.find(".date-from").val()),
					to 		= translateDate($this.find(".date-to").val()),
					dk 		= !$this.find(".abroadAddress").is(":checked")

				if (address && from && to) build[type].push(new CreateAddress(address,from,to,dk,i,type))

			})
			
			function CreateAddress (address,from,to,dk,i,type) {		
				this.address 	= address;
				this.from		= from;
				this.to 		= to;
				this.dk 		= dk;
				this.id 		= "AddressId_" + i;
				this.type		= type; 
			}
			
			function translateDate (date) {
				var s = date.split("-").map(function (v) {
					return Number(v)
				})		
				return cal.formateDate([s[0],s[1],s[2]])
			}

			return build

		}		
	}
	
	init();
	this.createGoogleMap($("#themap"));
	this.setYearDom();
	

}


MainControl.prototype.setYearDom = function () {

	$(".year-set").text("År: " + this.year)
	$("#year").val(this.year);
	$(".year-user").text(this.year)

}



MainControl.prototype.createGoogleMap = function ($appendTo) {
	
	var scope = this;

	var customMapType = new google.maps.StyledMapType([
	      {
	        stylers: [
	          {hue: '#708090'},
	          {visibility: 'simplified'},
	          {gamma: 0.5},
	          {weight: 0.5}
	        ]
	      },
	      {
	        featureType: 'water',
	        stylers: [{color: '#FFFFFF'}]
	      }
	    ], {
	      name: 'Custom Style'
	  });

	var customMapTypeId = 'custom_style';
	
	var mapOptions = {
      	center: { lat: 58, lng: 7},
      	zoom: 6,
		mapTypeControlOptions: {
		    mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
		}
    };
	
	this.map = new google.maps.Map($appendTo[0],mapOptions);
				
	this.map.mapTypes.set(customMapTypeId, customMapType);
	this.map.setMapTypeId(customMapTypeId);
	
}

/* ------ BefordringsForhold constructor ----- */    

function BefordringsForhold (controllerScope) {

	this.job 	= controllerScope.job;
	this.home 	= controllerScope.home;
	this.year 	= controllerScope.year;
		
	$(".bf_list,.current_bf").html(""); //CHANGE
	$(".add-bf-forhold-wrap").html("");
	$(".add-route-forhold-wrap").html("");

	$(".current_bf-wrap").removeClass("hidden");
	$(".insert-new-bf-double").addClass("hidden");

	$('<button type="button" class="btn skts-btn-secondary add-bf-forhold">Tilføj forhold/rute</button>').appendTo(".add-bf-forhold-wrap");
	$('<button type="button" class="btn skts-btn-secondary add-route-forhold">Tilføj</button>').appendTo(".add-route-forhold-wrap");
	
	this.initiateBasic();
	this.BF = []

	var self = this;
		
	$(".add-bf-forhold").on("click", function () {

		var bf = self.single_bf.map(function (v) {		
			 return self.findAddress(v)
		}) 

		var BFindex = main.bf_storage.length 

		bf = self.doBF(self.getoverlaps([bf]))[0]
		bf.numberTrips = 0;
		bf.index = BFindex+1;

		main.bf_storage.push(bf);
		self.printExistingBf();

		$(".current_bf-wrap").addClass("hidden");
		$(".insert-new-bf-double").removeClass("hidden");
		
		// CHANGE

	})

	$(".add-route-forhold").on("click",function () {

		$(".current_bf-wrap").removeClass("hidden");
		$(".insert-new-bf-double").addClass("hidden");
		self.initiateBasic();
		
	})

}

BefordringsForhold.prototype.doBF = function (bf_forhold) {

	var self = this
	
	return bf_forhold.map(function (v,i) {
		
		var dk = v.addresses.reduce(function (p,v) {
			if (p === true) {
				return (v.dk === false) ? false : true
			} else {
				return false
			}
		},true)
		
		var options = {
			from:v.from,
			to:v.to,
			address:v.address,
			dk:dk,
			generated:true
		}
	
		return new BF_manager(options,self.year,i);		
		
	})
}

BefordringsForhold.prototype.getNormal_ = function () {

	var self = this;

	var gross = this.home
		.map(function (v) {
			var home = v;
			return self.job.map(function (v) {
				return [home,v]
			})
		})
		.reduce(function (p,v) { 		
			return p.concat(v)
		},[])
		
	return this.doBF(this.getoverlaps(gross))
	
}

BefordringsForhold.prototype.checkifJobOoverlap = function () {

	var jobConstallations = this.job
		.map(function (v,i,array) {

			var others 	= array.slice(),
				thisJob = v
	
			others.splice(i,1)
				
			return others.map(function (v) {
				return [thisJob,v]
			})
									
		})
		.reduce(function (p,v) {
			return p.concat(v)

		},[])
		
	if (this.getoverlaps(jobConstallations).length > 0) return true

	return false

}

BefordringsForhold.prototype.initiateBasic = function () {

	$(".current_bf").html("");

	var self = this

	this.single_bf = [];


	if (this.home.length > 1) {
	
		this.printaddresses(this.home,"home");

	} else {

		this.single_bf.push(this.home[0].id);
		this.printAddressChoosed();
		this.printaddresses(this.getpossible(this.single_bf));

	}
	
}

BefordringsForhold.prototype.printExistingBf = function () {

	$(".bf_list").html("");

	var self = this;

	this.get$bfholder(main.bf_storage)
		.appendTo(".bf_list")

	$(".bf_list")
		.find("div").wrap("<div class='col-xs-12'></div>")
		.end()
		.find(".col-xs-12").wrap("<div class='row'></div>")
		.end()
		.find(".row").wrap("<div class='well'></div>")
		.end()
		.find("a").on("click", function () {

			var id 		= $(this).data("delete_id"),
				index 	= main.bf_storage.findIndex(function (v) {
							if (v.id === id) return true
						})

			main.bf_storage.splice(index,1)
			self.printExistingBf()
			
			return false

		})

}

BefordringsForhold.prototype.get$bfholder = function (bf) {

	var html = bf.map(function (v,i) {

		var period = cal.text(v.from)[0] + " - " + cal.text(v.to)[0] 

		var addresses = v.address.map(function (v) {
			return "<li>" + v + "</li>"	
		}).join("")

		return "<div class='bf-element'><p><b>#" + (i+1) + " kørselsforhold</b> " + period +  "</p><ul>" + addresses + "</ul><a href='#' data-delete_id='" + v.id + "'>slet</a></div>"

		
	})

	return $(html.join("")) 

}

BefordringsForhold.prototype.printaddresses = function (addresses,type) {

	var self = this
	
	$(".addresses-to-add").html("");

	var options = addresses.map(function (v) {
		return "<option value='" + v.id + "'>" + v.address + "</option>"
	})
	
	var tekst = (type === "home") ? "Kørsel fra adresse:" : "Kørsel til næste adresse:"
	
	options.unshift("<option value='0'>" + tekst + "</option>")

	if (addresses.length > 0) $("<select class='form-control'>" + options.join("") + "</select>").appendTo(".addresses-to-add")
	
	$(".addresses-to-add select").on("change", function () {
		
		if ($(this).val() !== "0") {
			self.single_bf.push($(this).val())
			self.printAddressChoosed();
			self.printaddresses(self.getpossible(self.single_bf));	
		}
	})

}

BefordringsForhold.prototype.printAddressChoosed = function () {

	var self = this;

	$(".current_bf").html("");

	var html = this.single_bf.map(function (v) {

		var obj = self.findAddress(v)
		return "<li class='clearfix'>" + obj.address + "<a href='#' id='" + v + "' class='pull-right'>slet</a></li>"
	})

	$(".current_bf").append("<ul>" + html.join("") + "</ul>") 
	
	$(".current_bf a").on("click", function () {
		var id 		= $(this).attr("id"),
			index 	= self.single_bf.indexOf(id)
		
		self.single_bf.splice(index)
		self.printAddressChoosed();
		self.printaddresses(self.getpossible(self.single_bf));
		
		return false
		
	})
}

BefordringsForhold.prototype.getpossible = function (addresses) {

	var self = this;

	var addressobj = addresses.map(function (v) {
		return self.findAddress(v)
	})
	
	var jobsToTest = this.job
		.filter(function (v) {			
			if (addresses.indexOf(v.id) === -1) return true
		})
		.map(function (v) {
			return [].concat(addressobj,v)
		})
		
	return this.getoverlaps(jobsToTest)
		.map(function (v) {		
			return v.addresses.filter(function (v) {
				if (v.type === "job" & addresses.indexOf(v.id) === -1) return true 
			})		
		})
		.reduce(function (p,v) {
			return p.concat(v)
		},[])
			
}

BefordringsForhold.prototype.getoverlaps = function (addresses) {

/*  
paramter is an array with gross possibilities, returning only thoses objects where there is an overlap. The period is represented in from, to
[[{address1,from,to},{address2},{address3}],[address4,address4],[..]]  
 */ 

	return addresses
		.map(function (v) {
		
			var fromDay = v.reduce(function (p,v) {
				return (v.from.dayN > p) ? v.from.dayN : p 
			},0);

			var toDay = v.reduce(function (p,v) {
				return (v.to.dayN < p) ? v.to.dayN : p 
			},366);

			var address = v.reduce(function (p,v) {
				return p.concat(v.address)

			},[])

			return {
				address:address,
				addresses:v,
				from:fromDay,
				to:toDay
			}

		})
		.filter(function (v) {
			if (v.to > v.from) return true
		})
	
}

BefordringsForhold.prototype.findAddress = function (id) {

	var all = [].concat(this.home,this.job)
	
	return all.find(function (v) {
		if (v.id === id) return true
	})

}



var main = new MainControl();









