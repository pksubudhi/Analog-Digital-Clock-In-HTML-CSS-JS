
            
            /*INITIALIZATION CODE */
            var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var x = document.getElementsByClassName("pklock");
            var i;
            for (i=0; i < x.length; i++){
                var y = x[i].children;
                
                hourHand = document.createElement("div");
                hourHand.className = "hour_hand";
                minHand = document.createElement("div");
                minHand.className = "min_hand";
                secHand = document.createElement("div");
                secHand.className = "sec_hand";
                dot = document.createElement("div");
                dot.className = "dot";
                
                clk = document.createElement("div");
                clk.className = "clock";
                
                ch = document.createElement("div");
                ch.className = "cross_horz";
                
                cv = document.createElement("div");
                cv.className = "cross_vert";
                
                c1 = document.createElement("div");
                c1.className = "cross cross1";
                
                c2 = document.createElement("div");
                c2.className = "cross cross2";
                
                c3 = document.createElement("div");
                c3.className = "cross cross3";
                
                c4 = document.createElement("div");
                c4.className = "cross cross4";
                
                inr = document.createElement("div");
                inr.className = "inner";
                
                inr.appendChild(hourHand);
                inr.appendChild(minHand);
                inr.appendChild(secHand);
                inr.appendChild(dot);
                
                clk.appendChild(ch);
                clk.appendChild(cv);
                clk.appendChild(c1);
                clk.appendChild(c2);
                clk.appendChild(c3);
                clk.appendChild(c4);
                clk.appendChild(inr);
                
                y[0].appendChild(clk);
                
                /*y[0].appendChild(hourHand);
                y[0].appendChild(minHand);
                y[0].appendChild(secHand);*/
            }
            
            /*UTILITY FUNCTIONS*/
            
            function getTimeString(dt) {
                
                var timeStr = "";
                hr = dt.getHours();
                if (hr > 12) {
                    hr = hr-12;
                }
                if (hr == 0){
                    hr = 12;
                }
                timeStr = timeStr + makeTwoDigitString(hr);
                timeStr = timeStr + ":" + makeTwoDigitString(dt.getMinutes());
                timeStr = timeStr + ":" + makeTwoDigitString(dt.getSeconds());
                return timeStr;
                
            }
            function makeTwoDigitString(x) {
                if(x<10) {
                    return "0"+x.toString();
                }
                else {
                    return x.toString();
                }
            }
            function getAmPm(dt) {
                var hr = dt.getHours();
                if(hr >= 12) {
                    return "PM";
                }
                else {
                    return "AM";
                }
            }
            
            function getDayNight(dt) {
                var hr = dt.getHours();
                if ( (hr>=6) && (hr<18)) {
                    return "<span style='color:#F1C538; font-size:1.4em;'>&nbsp;&nbsp;&nbsp;&#9788;</span>";
                }
                else {
                    return "<span style='color:#1BABE9; font-size:1.4em; '>&nbsp;&nbsp;&nbsp;&#9789;</span>"
                }
            }
            /*THREAD to UPDATE CLOCK */
            
            function setDigitalClock(){
                var currentTime = new Date();
                var x = document.getElementsByClassName("pklock");
                var currentTime = new Date();
                var i;
                
                
                for (i=0; i < x.length; i++){
                    
                    
                    var time_zone = x[i].dataset.timezone;
                    var temp = new Date(currentTime.toLocaleString("en-US", {timeZone: time_zone}));
                    
                    /*htime = d.getHours();
                    mtime = d.getMinutes();
                    stime = d.getSeconds();
                    hrotation = 30 * htime + mtime / 2;
                    mrotation = 6 * mtime;
                    srotation = 6 * stime;

                    hour.style.transform = `rotate(${hrotation}deg)`;
                    min.style.transform = `rotate(${mrotation}deg)`;
                    sec.style.transform = `rotate(${srotation}deg)`;*/
                    
                    var y = x[i].children;
                    
                    var cl1 = y[0].children;  // y[0] is .analog 
                    var cl2 = cl1[0].children; //cl1[0] is .clock
                    var cl3 = cl2[6].children; //cl2[6] is inner
                    
                    cl3[0].style.transform = "rotate(" + ((((temp.getHours()%12) * 30) ) + ((temp.getMinutes()/10) * 5) ) + "deg)";
                    cl3[1].style.transform = "rotate(" + (temp.getMinutes() * 6) + "deg)";
                    cl3[2].style.transform = "rotate(" + (temp.getSeconds() * 6) + "deg)";
                    
                    /* HERE IT HIGHLIGHTS THE CLOCK OF CURRENT TIMEZONE*/
                    
                    if(Intl.DateTimeFormat().resolvedOptions().timeZone == time_zone) {
                        y[1].style.backgroundColor = "#F7D3CD";
                    }
                    
                    offset = temp.getTimezoneOffset();
                    var offset_str = "";
                    if(offset > 0) {
                        offset_str = (offset / 60).toString() + " behind UTC";
                    }
                    else {
                        if (offset == 0) {
                            offset_str = "";
                        }
                        else {
                            offset_str = abs(offset / 60) + " ahead UTC";
                        }
                    }
                    
                    y[1].innerHTML ="<b>" +x[i].dataset.title + " " + getDayNight(temp) + "</b><br/> <span style='font-size: 2em;'>" + getTimeString(temp) + "</span> <b>" + getAmPm(temp) +"</b><br/><span style='font-size: 0.8em;'>" +days[temp.getDay()] + ", <b>" + temp.toLocaleDateString() + "</b>, " + offset_str + "</span>" ;

                    
                    /*y[1].innerHTML ="<b>" +x[i].dataset.title + "</b><br/> <span style='font-size: 2em;'>" + temp.toLocaleTimeString('en-US', {hour:'numeric', minute:'numeric'}) + "&#9789; &#9788; </span><br/><span style='font-size: 0.8em;'>" + temp.toLocaleDateString() + ", " + offset_str + "</span>" ;*/
                    /*
                    &#9789; &#9788; 
                    */
                }
                    
            }
            
            setInterval(setDigitalClock, 1000);
            function abs(dat) {
                if(dat<0) {
                    dat = 0 - dat;
                }
                return dat;
            }
