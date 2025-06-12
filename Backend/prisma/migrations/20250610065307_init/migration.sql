-- CreateTable
CREATE TABLE `Category` (
    `c_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `u_id` INTEGER NOT NULL,

    PRIMARY KEY (`c_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Todo` (
    `t_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `c_id` INTEGER NOT NULL,
    `is_completed` ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `u_id` INTEGER NOT NULL,

    PRIMARY KEY (`t_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_u_id_fkey` FOREIGN KEY (`u_id`) REFERENCES `User`(`u_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_c_id_fkey` FOREIGN KEY (`c_id`) REFERENCES `Category`(`c_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_u_id_fkey` FOREIGN KEY (`u_id`) REFERENCES `User`(`u_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
