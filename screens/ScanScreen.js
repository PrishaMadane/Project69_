import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component {
     constructor(){
         super();
         this.state = {
             hasCameraPermissions: null,
             scanned: false,
             scannedData: '',
             buttonState: 'normal'
         }
     }
     getCameraPermissions = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
          hasCameraPermissions: status === "granted",
        });
      }
      handleBarCodeScanned = async({type, data})=>{
          this.setState({
            scanned: true,
            scannedBookId: data,
            buttonState: 'normal'
          });
        } 
     render(){
        const hasCameraPermissions = this.state.hasCameraPermissions; 
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        
        if (buttonState === "clicked" && hasCameraPermissions){
            return(
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            );
          }
          else if (buttonState === "normal"){
         return(
             <View style={styles.container}>
                
                

                 <Text style={styles.requestText}>
                    { hasCameraPermissions === true ? this.state.scannedData: "Request Camera Permission"}
                 </Text>
                
                 <Text style={styles.title}>Bar Code Scanner</Text>

                 <TouchableOpacity
                  onPress={this.getCameraPermissions}
                  title = "Bar Code Scanner" 
                  style={styles.scanButton} >
                 <Text style={styles.text}>Scan QR Code</Text>
                 </TouchableOpacity>

                

                 <Image
                 style={styles.image}
                 source = {require('../assets/Barcode-scanner.jpg')}/>

             </View>
         )
          }
     }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  image :{
    height :150,
    width: 150,
    
    alignSelf:'center',
    marginTop: -400,
    marginLeft: -80,
  },
  title:{
    textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        margin:-90,
        alignSelf:'center',
        marginBottom: 79,
        
  },
    scanButton:{
      padding:3,
      fontSize: 14,
      marginTop: 10,
      marginBottom: 20,
      backgroundColor:'lightblue',
      width:120,
      height:30,
      alignSelf:'center',
      textAlign: 'center',
      },
      requestText:{
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 700,
        
      },
      text:{
        alignSelf:'center'
      }

})