import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'files',
})
export class Files {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column({ type: 'bytea' })
  data: Buffer;
}
