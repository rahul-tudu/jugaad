var text = "";
var length = 0;
var g_length;
var g_tabs;
var tabs;
var input;
var awesomplete;
var mycars = new Array();
var s;
var del_count;
var current_id;
var cindex = 0;
window.onload = function count() 
{
	if(getCookie("del_count") == "")
	{
		setCookie("del_count","0",7);
		del_count = 0;
	}
	else
		del_count = parseInt(getCookie("del_count"));

	if(del_count==1)
		document.getElementById("idel").src = "on.png";
	else
		document.getElementById("idel").src = "off.png";
	chrome.tabs.query({'currentWindow': true, 'highlighted': true, 'active': true}, function (tabs) 
		{
			current_id = tabs[0].id;
		});
	chrome.tabs.query({'currentWindow': true}, function (tabs) 
	{
		length = tabs.length;
		for(i=0;i<length;i++)
	{
		if(tabs[i].id == current_id)
			cindex = i;
	}
	});

	chrome.tabs.query({'currentWindow': true}, function (tabs) 
	{
		length = tabs.length;
		g_length = length;

		var tabs_val = new Array(length);
		for(i=0; i<tabs.length; i++)
		{
			var temp = "";
			temp = getCookie(tabs[i].id);
			if(temp != "")
			{
				tabs[i].title = temp;
				tabs_val[i] = temp;
			}
			else
			{
				tabs_val[i] = tabs[i].title;
			}

			if(i/10 == 0)
				text = text + "-----> " + tabs[i].title + String.fromCharCode(13) + String.fromCharCode(13);
			else
				text = text + "-----> " +tabs[i].title + String.fromCharCode(13) + String.fromCharCode(13);
		}

		setarray(length,i);
		var keyValuePairs = document.cookie.split(';');
		var c = 0;
		//document.getElementById("demo").innerText = text;

		for(var i = 0; i < keyValuePairs.length; i++) 
		{
		    var cname = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('='));
	    	var cvalue = keyValuePairs[i].substring(keyValuePairs[i].indexOf('=')+1);
	    	for(var j = 0; j < length; j++)
	    	{
	    		if(cname == tabs[j].id)
			    	{
						c++;
			   			break;
			    	}
	    	}

	    	if((c == 0) && (cname != "del_count"))
	    	{
	    		delete_cookie(cname);
	    	}

	    	c = 0;
		}


		g_tabs = tabs;
		var input = document.getElementById("gname");
		var awesomplete = new Awesomplete(input);
		var f = new Array();
		for(i=0; i<length; i++)
		{
			f[i] = tabs_val[i];
		}
		awesomplete.list = f;

	    $(mycars).each( function(index, item) {
	    	var option = $('<div style = "top: '+String(item)+'vh;left: 1vw;opacity: 1;position: absolute;z-index: 1"><button class="current" id="b'+String(index+1)+'">'+String(index+1)+'</button></div><div style = "top: '+String(item-1.6)+'vh;left: 5vw;opacity: 1;position: absolute;z-index: -1"><p>----->'+tabs[index].title+'</p></div>');
	        if(index == cindex)
	        {
				option = $('<div style = "top: '+String(item)+'vh;left: 1vw;opacity: 1;position: absolute;z-index: 1"><button class="button" id="b'+String(index+1)+'">'+String(index+1)+'</button></div><div style = "top: '+String(item-1.6)+'vh;left: 5vw;opacity: 1;position: absolute;z-index: -1"><p>----->'+tabs[index].title+'</p></div>');	        	
	        }
	        $('#dp').append(option);
	    });
	    for(k=0;k<length;k++)
	    {
	    	var str = "b"+String(k+1);
	   	 document.getElementById(String(str)).addEventListener("click",go);
	   	 document.getElementById(String(str)).param = k;
	   	 document.getElementById(String(str)).toggle = del_count;
	    }

	});


	chrome.tabs.query({'currentWindow': true, 'highlighted': true, 'active': true}, function (tabs) 
		{
			var text = "";
			var keyValuePairs = document.cookie.split(';');
			var id = tabs[0].id;
			var count = 0;

			for(var i = 0; i < keyValuePairs.length; i++) 
			{
			    var cname = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('='));
		    	var cvalue = keyValuePairs[i].substring(keyValuePairs[i].indexOf('=')+1);
		    	if(cname == String(id))
		    	{
		    		text = text + cvalue;
					count++;
		   			break;
		    	}
			}

			if (count == 0)
			{
				text = text + tabs[0].title;
			}

			var index = -1;
				for(i=0;i<length;i++)
				{
					if((g_tabs[i].id == id))
					{
						index = i + 1;
					}
				}

			if(text.length > 65)
			{
				text = text.substring(0,65);
				text = "(" + String(index) + ")" + text + ".....";
			}
			else
			{
				text = "(" + String(index) + ")" + text;
			}
			document.getElementById("present").innerText = text;
		});



}
bgnum.onclick = function go_to_tab_by_number() 
{
	var x = document.getElementById("gnum").value;
 	var index = parseInt(x);
 	index = index - 1;
    chrome.tabs.highlight({'tabs': index}, function (){});
}

brename.onclick = function rename_this_tab() 
{
	var val = document.getElementById("rename").value;
	var count = 0;
	if(document.cookie != "")
	{
	var keyValuePairs = document.cookie.split(';');

	for(var i = 0; i < keyValuePairs.length; i++) 
	{
	    var cname = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('='));
    	var cvalue = keyValuePairs[i].substring(keyValuePairs[i].indexOf('=')+1);
    	if(cvalue == val)
    	{
			count++;
   			break;
    	}
	}

	for(i=0; i<length; i++)
	{
		if(g_tabs[i].title == val)
			count++;
	}
	}

	if(count == 0)
	{
		chrome.tabs.query({'currentWindow': true, 'highlighted': true, 'active': true}, function (tabs) 
		{
			setCookie(tabs[0].id, val, 7);
		});
	}

}

bgname.onclick = function go_to_tab_by_name() 
{
	var name = document.getElementById("gname").value;
	var go_id = "";
	var keyValuePairs = document.cookie.split(';');

	for(var i = 0; i < keyValuePairs.length; i++) 
	{
	    var cname = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('='));
    	var cvalue = keyValuePairs[i].substring(keyValuePairs[i].indexOf('=')+1);
    	if(cvalue == name)
    	{
    		go_id = cname;
    		break;
    	}
	}

	var index = -1;
	for(i=0;i<length;i++)
	{
		if((g_tabs[i].title) == name)
		{
			index = i;
		}
	}

	chrome.tabs.highlight({'tabs': index}, function (){});
}

ball.onclick = function reset() 
{

	var keyValuePairs = document.cookie.split(';');
	for(var i = 0; i < keyValuePairs.length; i++) 
	{
    	var cname = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('='));
    	delete_cookie(cname);
	}

}

bcurrent.onclick = function reset_current() 
{
	chrome.tabs.query({'currentWindow': true, 'highlighted': true, 'active': true}, function (tabs) 
	{
		delete_cookie(tabs[0].id);
	});
}

function delete_cookie(name)
{
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};


function setCookie(cname, cvalue, exdays) 
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) 
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) 
    {
        var c = ca[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function sleep(miliseconds) 
{
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) 
   {
   }
}

function setarray(length,current_index)
{
	var i =0;
	var ini_height = 2.2;
	for(i=0; i<length; i++)
	{
		mycars[i] = String(ini_height);
			ini_height = ini_height + 4.91;
	}
}

function go(event) 
{
	if(del_count == 0)
		chrome.tabs.highlight({'tabs': event.target.param}, function (){});
	else
	{
		var ind = event.target.param;
		var id = g_tabs[ind].id;
		chrome.tabs.remove(id, function (){});
		window.location.reload();

	}

}

idel.onclick = function del_toggle()
{
	if(del_count == 0)
	{
		setCookie("del_count","1",7);
	}
	else
	{
		setCookie("del_count","0",7);
		
	}
	window.location.reload();
}













