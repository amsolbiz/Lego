// JavaScript Document
function SendMessage(sessionid, phoneNumber, message)
{
	//var str = "Anyone who reads Old and Middle English literary texts will be familiar with the mid-brown volumes of the EETS, with the symbol of Alfred's jewel embossed on the front cover. Most of the works attributed to King Alfred or to Aelfric, along with some of those by bishop Wulfstan and much anonymous prose and verse from the pre-Conquest period, are to be found within the Society's three series; all of the surviving medieval drama, most of the Middle English romances, much religious and secular prose and verse including the English works of John Gower, Thomas Hoccleve and most of Caxton's prints all find their place in the publications. Without EETS editions, study of medieval English texts would hardly be possible.As its name states, EETS was begun as a 'club', and it retains certain features of that even now. It has no physical location, or even office, no paid staff or editors, but books in the Original Series are published in the first place to satisfy subscriptions paid by individuals or institutions. This means that there is need for a regular sequence of new editions, normally one or two per year; achieving that sequence can pose problems ";
	var maxMessageSize = 160;

	var iNoOfSubMessages = (message.length/maxMessageSize) + (message.length%maxMessageSize);
	var strSubMessage;

	for (var i=0; i < iNoOfSubMessages; i++)
	{
		strSubMessage = message.substr( (i*maxMessageSize) , maxMessageSize);
		
		SendSMSTelenor(sessionid, phoneNumber, strSubMessage);
	}
}


function SendSMSTelenor(sessionid, phoneNumber, messageBody)
{
	jQuery.ajax({
			   type: "GET",
			   url: 'https://telenorcsms.com.pk:27677/corporate_sms2/api/sendsms.jsp?session_id='+sessionid+'&to='+phoneNumber+'&text='+messageBody,
			   dataType: "xml",
			   contenttype:"application/x-www-form-urlencoded; charset=UTF-8",

			   success: function (data) {
				$("#Alert").text('');
			   },
			   error: function (XMLHttpRequest, textStatus, errorThrown) {
				   alert("error");
			   }
		   });
}

function getSessionId(phoneNumber, password)
{
	 var FrmMessage =  $("#message").val();
	jQuery.ajax({
           type: "GET",
           url: 'https://telenorcsms.com.pk:27677/corporate_sms2/api/auth.jsp?msisdn=923458508310&password=0000',
           dataType: "xml",
           contenttype:"application/x-www-form-urlencoded; charset=UTF-8",

           success: function (data) {
             $(data).find('corpsms').each(function(){
                     SessionID = $(this).find("data").text()
                    SendMessage(SessionID, "923214099117", "Hellooo This is from Master ... 1025");
                });
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
               alert("error");
           }
       });
}