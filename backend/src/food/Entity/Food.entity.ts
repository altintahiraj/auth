import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('food')
export class FoodEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    image: string;

    @Column({ default: false })
    is_active: boolean
}