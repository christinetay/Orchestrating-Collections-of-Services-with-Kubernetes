import mongoose from 'mongoose';
import { Password } from '../services/password';

// (3) Solution 3: Mongoose schema and linking to typescript model,
//     define build function by extends mongoose.Model with UserModel
//     by adding user doc
// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
    email: string,
    password: string
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        transform(doc: any, ret: any){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v
            delete ret.password;
        }
    }
});

// change password to hashed password
userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// build details into new user pattern
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

export { User };


// // %%%%%                TESTING RESULT AS BELOW                 %%%%%%
// //                                                                   %
// // We just defined the mongoose attribute                            %
// // and linking it with typescript interface model,                   %
// // define build function by extends mongoose.Model with UserModel    %
// // By adding UserDoc, it defined user document                       %
// // and allow admin to use each correct element invidually            %
// // from model class separately                                       %
// //                                                                   %
// // %%%%%                TESTING RESULT AS BELOW                 %%%%%%


// const userTemp = User.build({
//     email: 'test@gmail.com',
//     password: '123'
//     // unexpectedField :'Lalala'
// });

// userTemp.email;
// userTemp.password;
// userTemp.unexpectedField;





/////////////////////////////////////////////////////////////////////////////////////////
// (1) Solution 1: Mongoose schema without linking to typescript model
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true 
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// const User = mongoose.model('User', userSchema);

// export { User };

// // %%%%%                TESTING RESULT AS BELOW                 %%%%%%
// //                                                                   %
// // We just defined the mongoose attribute                            %
// // without linking it with typescript model                          %
// // Typescript unable to tell which attribute is correct.             %
// // So it allows everything and allow new self-defining attribute     %
// // It is hard to control and easy to lead to incorrect field or data %
// //                                                                   %
// // %%%%%                TESTING RESULT AS BELOW                 %%%%%%

// new User({
//     email: 'test@gmail.com',
//     password: 12345,
//     unexpectedField :'Lalala'
// });



/////////////////////////////////////////////////////////////////////////////////////////
// // (2) Solution 2: Mongoose schema AND linking to typescript interface model
// // Typescript model interface
// interface UserAttrs {
//     email: string;
//     password: string;
// }

// // Mongoose.schema and its Mongoose.model
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// const User = mongoose.model('User', userSchema);

// const buildUser = (userAttrs: UserAttrs) => {
//     return new User(userAttrs);
// }

// export { User, buildUser };

// // %%%%%                TESTING RESULT AS BELOW                 %%%%%%
// //                                                                   %
// // We just defined the mongoose attribute                            %
// // and linking it with typescript interface model                    %
// // with the method buildUser                                         %
// // The method buildUser worked well and able to tell error           %
// // if the attribute or data type is wrong                            %
// // However, it requests the admin to remember which to use           %
// // When it comes to add new User                                     %
// // (we should use buildUser to add new user in Solution 2)           %
// // So, we can reduce the export field and                            %
// // make it easy for people to use                                    %
// //                                                                   %
// // %%%%%                TESTING RESULT AS BELOW                 %%%%%%


// buildUser({
//     email: 'test@gmail.com',
//     password: 12345,
//     unexpectedField :'Lalala'
// });



/////////////////////////////////////////////////////////////////////////////////////////

// // (3) Solution 3: Mongoose schema and linking to typescript model,
// //     define build function by extends mongoose.Model with UserModel
// // An interface that describes the properties
// // that are required to create a new User
// interface UserAttrs {
//     email: string,
//     password: string
// }

// // An interface that describes the properties
// // that a User Model has
// interface UserModel extends mongoose.Model<any> {
//     build(userAttrs: UserAttrs): any;
// }

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// const User = mongoose.model<any, UserModel>('User', userSchema);

// userSchema.statics.build = (attrs: UserAttrs) => {
//     return new User(attrs);
// }

// export { User };

// // %%%%%                TESTING RESULT AS BELOW                 %%%%%%
// //                                                                   %
// // We just defined the mongoose attribute                            %
// // and linking it with typescript interface model,                   %
// // define build function by extends mongoose.Model with UserModel    %
// // The method User.build({}) worked well and able to tell error      %
// // if the attribute or data type is wrong                            %
// // So, we only export User and easy people to use                    %
// // the implemented function on User, "User.build({})"                %
// //                                                                   %
// // %%%%%                TESTING RESULT AS BELOW                 %%%%%%


// User.build({
//     email: 'test@gmail.com',
//     password: 12345,
//     unexpectedField :'Lalala'
// });






////////////////////////////////////////////////////////////////////////////////////////////



// interface UserAttrs {
//     email: string;
//     password: string;
// }

// interface UserModel extends mongoose.Model<UserDoc> {
//     build(attrs: UserAttrs): UserDoc;
// }

// interface UserDoc extends mongoose.Document {
//     email: string;
//     password: string;
// }

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// userSchema.statics.build = (attrs: UserAttrs) =>{
//     return new User(attrs);
// };

// const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs);
// };

// buildUser({
//     email: "test@test.com",
//     password: "P@ssw0rd"
// });

// User.build({
//     email: "test2@test.com",
//     password: "P@ssw0rd"
// });

// const user = User.build({
//     email: "test2@test.com",
//     password: "P@ssw0rd"
// });


// export { User };