int analogPin = 0;
int tmpVal;
float tmp;
unsigned long act;
int err;

void setup() {
  Serial.begin(9600);
  act=0;
}

void loop() {
  err = millis()-act;
  if(err<0) err = 0;
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
  delay(2000-err);
  act+=2000;
}
