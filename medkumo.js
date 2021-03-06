//medkumo.js
(function(window, undefined) {
	var Medkumo = {};
	if (window.Medkumo) {
		return;
	}	
	Medkumo.initial = function(key) {		
		loadStylesheet('http://sdk.medkumo.loc:85/medkumo.css');		
		loadScript('http://sdk.medkumo.loc:85/lib/jquery-medkumo.js',showWidget);		
	};
	
	var showWidget=function showWidget(){
		 var btnHTMLConntent="<a href='#' id='BaP_BtnBookAnAppointment' class='Medkumo_Btn_Style'>Book An Appointment<a>";
		 var Medkumo_PnlBookAnAppointment=document.createElement('div');
		 Medkumo_PnlBookAnAppointment.innerHTML=btnHTMLConntent; 
		 Medkumo_PnlBookAnAppointment.setAttribute("id", "Medkumo_PnlBookAnAppointment");
		 document.body.appendChild(Medkumo_PnlBookAnAppointment); 	
		 Medkumo.jQuery(document).on("click","#BaP_BtnBookAnAppointment",function()
		 {
			renderDoctorsForm();
		 });
	}	
	 function renderDoctorsForm()
	 {
		var DOCTORLIST_URI='http://api.medkumo.loc:85/listdoctor.json';
		var formListDoctor='<div class="BaP_Doctors">'+
			'<a href="#" id="BaP_Doctors_BtnClose">X</a>'+			
			'</div>';
		Medkumo.jQuery("#BaP_PnlBookAnAppointment").html(formListDoctor);
		Medkumo.jQuery.getJSON(DOCTORLIST_URI, function (dr){		
			dr.doctors.map(function(item,index){console.log(item);
			var doc='<div class="BaP_Doctor_Item">'+
					'<input type="hidden" value="'+item.doctor_key+'" class="doctor_key"/>'+
					'<input type="hidden" value="'+item.hopital_key+'" class="hopital_key"/>'+
					'<img src="http://0.soompi.io/wp-content/uploads/2016/05/27215011/YG-.jpg">'+	
					'<p class="BaP_Doctor_Item_Name">'+item.doctor_name+'</p>'+
					'<a href="#"  class="BaP_Doctor_Item_BtnBook btn_Style">Book An Appointment</a>'+
				'</div>';
			Medkumo.jQuery('.BaP_Doctors').append(doc);
			})
		});
	 }
	function loadScript(src, callback){
	  var script, isReady;
	  isReady = false;
	  script = document.createElement('script');
	  script.type = 'text/javascript';
	  script.src = src;
	  script.onload = script.onreadystatechange = function() {
		//console.log( this.readyState ); //uncomment this line to see which ready states are called.
		if ( !isReady && (!this.readyState || this.readyState == 'complete') )
		{
		  isReady = true;
		  callback();
		}
	  };
	  document.body.appendChild(script);
	}
	function loadStylesheet(url) {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		var entry = document.getElementsByTagName('script')[0];
		entry.parentNode.insertBefore(link, entry);
	}

	window.Medkumo = Medkumo;
})(this);

if (typeof window.Medkumo_ready === 'function') {
	window.Medkumo_ready();
}