import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'files',
})
export class Files {
  /**
   * UUID generated automatically
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column({ type: 'bytea' })
  data: Buffer;
}
