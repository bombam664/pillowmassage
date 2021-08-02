#include <WebSocketsClient.h>
#include <SocketIoClient.h>
#include <ArduinoJson.h>

#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>



ESP8266WiFiMulti WiFiMulti;
SocketIOclient webSocket;

#define USE_SERIAL Serial

#ifndef STASSID
#define STASSID "iot"
#define STAPSK  "123456789"
#endif

const char* ssid     = STASSID;
const char* password = STAPSK;


//button pressed
#define D1 5 
#define button D1     // switch1 input Active Low
#define pressed LOW

#define D2 4 
#define button2 D2     // switch2 input Active Low
#define pressed2 LOW


#define D3 0 
#define button3 D3     // switch3 input Active Low
#define pressed3 LOW

 int vout = 0;


void setup() 
{
  
   USE_SERIAL.begin(115200);
  pinMode(button,INPUT_PULLUP);
  pinMode(button2,INPUT_PULLUP);
  pinMode(button3,INPUT_PULLUP);
   
  USE_SERIAL.setDebugOutput(true);

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  
 for(uint8_t t = 4; t > 0; t--) {
          USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
          USE_SERIAL.flush();
          delay(1000);
      }


     WiFi.mode(WIFI_STA);
// disable AP
    if(WiFi.getMode() & WIFI_AP) {
        WiFi.softAPdisconnect(true);
    }

    WiFiMulti.addAP(ssid, password);

      

  
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    USE_SERIAL.print(".");
  }

  //WiFi.disconnect();
    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
    }

    String ip = WiFi.localIP().toString();
    USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

  // server address, port and URL
    webSocket.begin("192.168.43.238", 5000, "/socket.io/?EIO=4");
    webSocket.onEvent(socketIOEvent);
  
}


void loop() 
{
    webSocket.loop();

    bool ReadSwitch = digitalRead(button);
    bool ReadSwitch2 = digitalRead(button2);
    bool ReadSwitch3 = digitalRead(button3);
  if(ReadSwitch == pressed)
  {
     vout = 1;
    
      DynamicJsonDocument doc(1024);
        JsonArray array = doc.to<JsonArray>();
        array.add("emit");
      JsonObject param1 = array.createNestedObject();
        param1["message"] = (uint32_t) vout;
        String output;
        serializeJson(doc, output);
        webSocket.sendEVENT(output);
        USE_SERIAL.println(output);
        delay(250);
  }else if(ReadSwitch2 == pressed2){
    vout = 2;
    DynamicJsonDocument doc(1024);
        JsonArray array = doc.to<JsonArray>();
        array.add("emit");
      JsonObject param1 = array.createNestedObject();
        param1["message"] = (uint32_t) vout;
        String output;
        serializeJson(doc, output);
        webSocket.sendEVENT(output);
        USE_SERIAL.println(output);
        delay(250);
  }else if(ReadSwitch3 == pressed3){
    vout = 3;
    DynamicJsonDocument doc(1024);
        JsonArray array = doc.to<JsonArray>();
        array.add("emit");
      JsonObject param1 = array.createNestedObject();
        param1["message"] = (uint32_t) vout;
        String output;
        serializeJson(doc, output);
        webSocket.sendEVENT(output);
        USE_SERIAL.println(output);
        delay(250);
  }else{
     vout = 0;
   }

}

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            USE_SERIAL.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

            // join default namespace (no auto join in Socket.IO V3)
            webSocket.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
            USE_SERIAL.printf("[IOc] get event: %s\n", payload);
            break;
        case sIOtype_ACK:
            USE_SERIAL.printf("[IOc] get ack: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_ERROR:
            USE_SERIAL.printf("[IOc] get error: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_EVENT:
            USE_SERIAL.printf("[IOc] get binary: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_ACK:
            USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
            hexdump(payload, length);
            break;
    }
}
