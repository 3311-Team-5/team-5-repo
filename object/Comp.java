package object;

public class Comp{
    protected String comp_brand;
    protected String model;
    protected String cpu;

    public Comp(String comp_brand, String model, String cpu){
        this.comp_brand = comp_brand;
        this.model = model;
    }

    public String comp(){
        return comp_brand;
    }

    public String model(){
        return model;
    }

    @Override
    public String toString(){
        return comp_brand + " " + model;
    }
}