import Knex = require('knex');
import * as moment from 'moment';

export class SettingModels { 

    saveBackup(db: Knex, data: any) {
        return db('um_backup')
          .insert(data);
      }
    
      getBackupList(db: Knex) {
        return db('um_backup')
          .orderBy('backup_date', 'DESC');
      }
    
      getBackupFile(db: Knex, backupId: any) {
        return db('um_backup')
          .where('backup_id', backupId);
      }
    
      removeBackupFile(db: Knex, backupId: any) {
        return db('um_backup')
          .where('backup_id', backupId)
          .del();
      }
}
