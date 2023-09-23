package object;

public class Memory{
    private String mem_type;
    private int cap_num;
    private String cap_size;

    public Memory(String mem_type, int cap_num, String cap_size){
        this.mem_type = mem_type;
        this.cap_num = cap_num;
        this.cap_size = cap_size;
    }

    public String mem_type(){
        return mem_type;
    }

    public int cap_num(){
        return cap_num;
    }

    public String cap_size(){
        return cap_size;
    }

    @Override
    public String toString(){
        return mem_type + " with " +  cap_num + cap_size;
    }
}