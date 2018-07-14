import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import capacity from '../capacity';
//import file from '../file';
//import certificate from '../certificate';

export default function(app){
  app.use(morgan('common'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());
  app.use(cors());

  app.disable('etag');

  app.get('/', (req, res) => { res.send('Hello World'); });
  app.use('/api/capacity', capacity());
  //app.use('/api/file', file());
  //app.use('/api/certificate', certificate());

  app.use((err, req, res, next) => {
    console.error(err.stack);
    if (res.headersSent) {
      return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
  });

}
