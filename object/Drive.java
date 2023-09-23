// package tree;

// public class Drive{
//     private String drive_type;
//     private int cap_num;
//     private String cap_type;

//     public Drive(String drive_type, int cap_num, String cap_type){
//         this.drive_type = drive_type;
//         this.cap_num = cap_num;
//         this.cap_size = cap_size;
//     }

//     public String drive_type(){
//         return drive_type;
//     }

//     public int cap_num(){
//         return cap_num;
//     }

//     public String cap_size(){
//         return cap_size;
//     }

//     @Override
//     public String toString(){
//         return drive_type + " with " +  cap_num + cap_size;
//     }
// }

package object;

public class Drive extends Memory{
    public Drive(String drive_type, int cap_num, String cap_size){
        super(drive_type, cap_num, cap_size);
    }
}