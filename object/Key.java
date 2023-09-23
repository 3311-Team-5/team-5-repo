package object;

public class Key{
    private String win_key;
    private String off_key;
    private String soft_key;
    private String username;
    
    public Key(String win_key, String off_key, String soft_key, String username){
        this.win_key = win_key;
        this.off_key = off_key;
        this.soft_key = soft_key;
        this.username = username;
    }

    public String win_key(){
        return win_key;
    }

    public String off_key(){
        return off_key;
    }

    public String soft_key(){
        return soft_key;
    }

    public String username(){
        return username;
    }

    @Override
    public String toString(){
        return username;
    }
}