package object;

import java.util.ArrayList;

public class Device{
    protected String comp_brand;
    protected String model;
    protected String cpu;
    // private Comp comp;
    private ArrayList<Key> keys;
    private ArrayList<Ram> rams;
    private ArrayList<Drive> drives;

    public Device(String comp_brand, String model, String cpu){
        // this.comp = comp;
        this.comp_brand = comp_brand;
        this.model = model;
        this.keys = new ArrayList<>();
        this.rams = new ArrayList<>();
        this.drives = new ArrayList<>();
    }

    public String comp(){
        return comp_brand;
    }

    public String model(){
        return model;
    }

    public String cpu(){
        return cpu;
    }

    public void addKey(Key key){
        keys.add(key);
    }

    public void addRam(Ram ram){
        rams.add(ram);
    }

    public void addDrive(Drive drive){
        drives.add(drive);
    }

    @Override
    public String toString(){
        StringBuilder result = new StringBuilder(comp_brand + " " + model + " containing ");
        if(rams.size() > 0){
            String separator = " with ram ";
            for(Ram r : rams){
                result.append(separator + r.toString());
                separator = ", ";
            }
        }
        if(drives.size() > 0){
            String separator = " and internal storage ";
            for(Drive d : drives){
                result.append(separator + d.toString());
                separator = ", ";
            }
        }
        return result.toString();
    }
}