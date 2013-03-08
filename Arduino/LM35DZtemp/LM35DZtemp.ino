int analogPin = 0;
int tmpVal;
float tmp;

void setup() {
  Serial.begin(9600);
}

void loop() {
  tmpVal = analogRead(analogPin);
//  tmp = ((5*tmpVal)/1024)*100;
  tmp = map(tmpVal,0,1023,0,5000);
  tmp /= 10;
//  Serial.print(millis()/1000);
//  Serial.print("sec\t");
  if(Serial.available()>0) {
    while(Serial.available()) {
      Serial.read();
    }
    Serial.println(tmp);
  }
//  Serial.println(" deg C");
  delay(2000);
}
