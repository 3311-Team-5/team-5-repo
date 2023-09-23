import java.util.ArrayList;

import object.Device;
import object.Drive;
import object.Key;
import object.Ram;

import java.io.Console;

public class Demo{
    private ArrayList<Device> devices = new ArrayList<>();

    private Console console = System.console();
    
    private void addDevice(){
        console.printf("\nEnter Device Brand and Model\n");
        Device newDev = new Device(
            console.readLine("Computer Brand: "),
            console.readLine("Model Name: "),
            console.readLine("CPU: "));
        newDev.addKey(new Key(
            console.readLine("Windows Key: "),
            console.readLine("OfficeKey: "),
            console.readLine("Software Key: "),
            console.readLine("Username: ")));
        newDev.addRam(new Ram(
            console.readLine("Ram Type: "),
            Integer.parseInt(console.readLine("Amount of Ram: ")),
            console.readLine("Size: ")));
        newDev.addDrive(new Drive(
            console.readLine("Hard Drive Type: "),
            Integer.parseInt(console.readLine("Amount of Storage: ")),
            console.readLine("Size: ")));
        devices.add(newDev);
    }
    
    public void choice(){
        String cmd = " ";
        while(!cmd.equals("quit")){
            if(devices.size() > 0){
                console.printf("\nAll Added Devices\n");
            }
            for(Device d : devices){
                console.printf(" %s\n", d.toString());
            }
            cmd = console.readLine("\nAdd Device or Quit? ").trim().toLowerCase();
            switch(cmd){
                case "add":
                    addDevice();
                case "quit":
            }
        }
    }
    public static void main(String[] args){
        Demo demo = new Demo();
        demo.choice();
    }
}
