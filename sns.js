/**
 * @author 김영훈 (zeroh7@gmail.com)
 * @since 2015.05.15
 * @brief SNS 실시간 연동을 위한 스크립트 
 */
      	
		function get_facebook(limit){
			$.ajax({
				url : getFeedUrl, 
				type : "post", 
				dataType : "json", 
				asysnc : false,
				success : function(data) {
					// to do 
				}, 
				error : function(request) {
					// to do 
				}
			});
        }			
		
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) return;
		 	js = d.createElement(s); js.id = id;
		  	js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.0&appId=";
		  	fjs.parentNode.insertBefore(js, fjs);
		  	
		}(document, 'script', 'facebook-jssdk'));
		
        		
		function getVids(pid, y_number){
			var vidResults = y_number; // 채널 수
			pid = '';
			$.ajax({
				url : 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=8&playlistId=',
				type:"post",
				dataType : 'jsonp', 
				success:function(data){
					// to do 
				}
				
			});

		}

		function fn_twitterTimeline2(twit_number){
			var twitterPrm = {
			api: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=skylife&exclude_replies=true',
			
			exclude_replies : false,
			callback: "",
			consumerKey: "",  
			consumerSecret: "",
			accessToken: "",
			tokenSecret: ""
		 
		 }
		 
		 var oauthMessage = {
				 
		   method: "GET",
		   action: twitterPrm.api,
		   parameters: {		   
			   count: twitterPrm.count,
			   callback: twitterPrm.callback,
			   oauth_version: "1.0",
			   oauth_signature_method: "HMAC-SHA1",
			   oauth_consumer_key: twitterPrm.consumerKey,
			   oauth_token: twitterPrm.accessToken
	  		 }
		  };
		 
		 //Outh인증관련
		 OAuth.setTimestampAndNonce(oauthMessage);
		 
		 OAuth.SignatureMethod.sign(oauthMessage, {
			  consumerSecret: twitterPrm.consumerSecret,
			  tokenSecret: twitterPrm.tokenSecret
		 });
		 
		 //Outh인증끝
		 //Outh인증하여 URL리턴(jsonType)
	 	 var twJsonPath = OAuth.addToURL(oauthMessage.action, oauthMessage.parameters);
	
		 $.ajax({
				  type: oauthMessage.method,
				  url: twJsonPath,
				  dataType: "jsonp",
				  jsonp: false,
				  cache: true
			 });
		}

					// 날짜 변환 함수 
		function formatDate2(d){							
			var twit_date = new Array();
			twit_date = d.split(" ");
			
			// gmt parse 
			var total_date = twit_date[0] + ' ' + twit_date[1] + ' ' + twit_date[2] + ' ' + twit_date[5] + ' ' + twit_date[3] + ' ' + twit_date[4];
			var kr_date = new Date(Date.parse(total_date));

			var formatResult = '' ; 			    
		    var AmPm = getAmPm(kr_date.getHours(), addZero(kr_date.getMinutes()) );    

		    // 0 추가하기 
		    function addZero(n){	
				 return n < 10 ? '0' + n : '' + n; 
			} 
			 
		 	function getAmPm(h, m){
		 		return h > 12 ?  ' 오후 ' + (h - 12) +':'+ m  : ' 오전 ' + h + ':' + m ;  
		 	}
	    
		    formatResult += kr_date.getFullYear() + "년 "; 
		    formatResult += kr_date.getMonth() + 1 + "월 "; 
		    formatResult += kr_date.getDate() + "일 ";
		    formatResult += AmPm;
		    
		    return formatResult
		    
		}
		
		/* /트위터 test*/
		
		/* twitter */

		function fn_twitterTimeline(twit_number){
			var twitterPrm = {
			api: 'https://api.twitter.com/1.1/statuses/user_timeline.json?&include_rts=false',
			//count: twit_number, //불러올 타임라인 수
			exclude_replies : false,
			callback: "",
			consumerKey: "",  
			consumerSecret: "",
			accessToken: "",
			tokenSecret: ""
		 
		 }
		 var oauthMessage = {
		   method: "GET",
		   action: twitterPrm.api,
		   parameters: {		   
			   count: twitterPrm.count,
			   callback: twitterPrm.callback,
			   oauth_version: "1.0",
			   oauth_signature_method: "HMAC-SHA1",
			   oauth_consumer_key: twitterPrm.consumerKey,
			   oauth_token: twitterPrm.accessToken
	  		 }
		  };
		 
		 //Outh인증관련
		 OAuth.setTimestampAndNonce(oauthMessage);
		 
		 OAuth.SignatureMethod.sign(oauthMessage, {
			  consumerSecret: twitterPrm.consumerSecret,
			  tokenSecret: twitterPrm.tokenSecret
		 });
		 
		 //Outh인증끝
		 //Outh인증하여 URL리턴(jsonType)
	 	 var twJsonPath = OAuth.addToURL(oauthMessage.action, oauthMessage.parameters);
	
		 $.ajax({
				  type: oauthMessage.method,
				  url: twJsonPath,
				  dataType: "jsonp",
				  jsonp: false,
				  cache: true
			 });
		}

