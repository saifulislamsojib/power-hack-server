import env from 'dotenv';
import { connect } from 'mongoose';

// env config
env.config();

// database connection with mongoose
const mongoConnect = async () => {
    try {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ernz8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        const mongo = await connect(uri);
        console.log('Database successfully connected!');
        return mongo;
    } catch (error) {
        console.log('Database connection error', error);
        return undefined;
    }
};

export default mongoConnect;
