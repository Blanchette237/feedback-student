-- ============================================================
-- Feedback Student Forum - Database Schema
-- Compatible with: MySQL 8.0+ / MariaDB 10.5+
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- ROLES
-- ============================================================
CREATE TABLE IF NOT EXISTS `roles` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `type`        VARCHAR(50)  NOT NULL UNIQUE,  -- e.g. 'student', 'teacher', 'admin'
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id`                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`              VARCHAR(100)    NOT NULL,
  `email`             VARCHAR(150)    NOT NULL UNIQUE,
  `email_verified_at` TIMESTAMP       NULL     DEFAULT NULL,
  `password`          VARCHAR(255)    NOT NULL,
  `role_id`           INT UNSIGNED    NULL     DEFAULT NULL,
  `remember_token`    VARCHAR(100)    NULL     DEFAULT NULL,
  `created_at`        TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`        TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_users_role`
    FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- PERSONAL ACCESS TOKENS  (Laravel Sanctum compatible)
-- ============================================================
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id`             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` VARCHAR(255)    NOT NULL,
  `tokenable_id`   BIGINT UNSIGNED NOT NULL,
  `name`           VARCHAR(255)    NOT NULL,
  `token`          VARCHAR(64)     NOT NULL UNIQUE,
  `abilities`      TEXT            NULL,
  `last_used_at`   TIMESTAMP       NULL DEFAULT NULL,
  `expires_at`     TIMESTAMP       NULL DEFAULT NULL,
  `created_at`     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_tokenable` (`tokenable_type`, `tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- COURSES
-- ============================================================
CREATE TABLE IF NOT EXISTS `courses` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(200) NOT NULL,
  `description` TEXT         NULL,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- FEEDBACKS
-- ============================================================
CREATE TABLE IF NOT EXISTS `feedbacks` (
  `id`             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `description`    TEXT            NOT NULL,
  `created_date`   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `generated_date` DATETIME        NULL     DEFAULT NULL,
  `user_id`        BIGINT UNSIGNED NOT NULL,
  `created_at`     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_feedbacks_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- FEEDBACK <-> COURSE  (many-to-many)
-- ============================================================
CREATE TABLE IF NOT EXISTS `feedback_course` (
  `feedback_id` BIGINT UNSIGNED NOT NULL,
  `course_id`   INT UNSIGNED    NOT NULL,
  PRIMARY KEY (`feedback_id`, `course_id`),
  CONSTRAINT `fk_fc_feedback`
    FOREIGN KEY (`feedback_id`) REFERENCES `feedbacks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fc_course`
    FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- SECTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS `sections` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(200) NOT NULL,
  `description` TEXT         NULL,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- DIVIDED_INTO  — FEEDBACK <-> SECTION  (many-to-many)
-- ============================================================
CREATE TABLE IF NOT EXISTS `divided_into` (
  `id`          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `feedback_id` BIGINT UNSIGNED NOT NULL,
  `section_id`  INT UNSIGNED    NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_divided_into` (`feedback_id`, `section_id`),
  CONSTRAINT `fk_di_feedback`
    FOREIGN KEY (`feedback_id`) REFERENCES `feedbacks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_di_section`
    FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- QUESTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS `questions` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`          VARCHAR(500) NOT NULL,
  `section_id`     INT UNSIGNED NOT NULL,
  `created_date`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `generated_date` DATETIME     NULL     DEFAULT NULL,
  `created_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_questions_section`
    FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- RESPONSES
-- ============================================================
CREATE TABLE IF NOT EXISTS `responses` (
  `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` TEXT            NOT NULL,
  `question_id` INT UNSIGNED    NOT NULL,
  `user_id`     BIGINT UNSIGNED NOT NULL,
  `created_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_responses_question`
    FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_responses_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- COMMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS `comments` (
  `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` TEXT            NOT NULL,
  `feedback_id` BIGINT UNSIGNED NOT NULL,
  `user_id`     BIGINT UNSIGNED NOT NULL,
  `created_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comments_feedback`
    FOREIGN KEY (`feedback_id`) REFERENCES `feedbacks` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- MANAGE  — links users who manage feedbacks (e.g. teachers)
-- ============================================================
CREATE TABLE IF NOT EXISTS `manage` (
  `id`          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `user_id`     BIGINT UNSIGNED NOT NULL,
  `feedback_id` BIGINT UNSIGNED NOT NULL,
  `created_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_manage` (`user_id`, `feedback_id`),
  CONSTRAINT `fk_manage_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_manage_feedback`
    FOREIGN KEY (`feedback_id`) REFERENCES `feedbacks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;


-- ============================================================
-- SEED DATA
-- ============================================================

-- Roles
INSERT INTO `roles` (`type`) VALUES
  ('admin'),
  ('teacher'),
  ('student');

-- Users  (passwords are bcrypt of 'password')
INSERT INTO `users` (`name`, `email`, `password`, `role_id`) VALUES
  ('Admin User',   'admin@feedback.test',   '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1),
  ('Jane Teacher', 'teacher@feedback.test', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2),
  ('John Student', 'student@feedback.test', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3);

-- Courses
INSERT INTO `courses` (`title`, `description`) VALUES
  ('Mathematics 101',  'Introductory mathematics course'),
  ('Web Development',  'Full-stack web development course'),
  ('Data Structures',  'Algorithms and data structures');

-- Sections
INSERT INTO `sections` (`title`, `description`) VALUES
  ('Course Content',   'Feedback on course material quality'),
  ('Teaching Method',  'Feedback on how the course is taught'),
  ('Assignments',      'Feedback on exercises and homework');

-- Questions
INSERT INTO `questions` (`title`, `section_id`) VALUES
  ('Was the course content clear and well structured?',    1),
  ('Were the learning objectives met?',                    1),
  ('Did the teaching method suit your learning style?',    2),
  ('Were explanations easy to understand?',               2),
  ('Were the assignments relevant to the course topics?',  3),
  ('Was the workload reasonable?',                        3);

-- Feedback submitted by the student
INSERT INTO `feedbacks` (`description`, `created_date`, `generated_date`, `user_id`) VALUES
  ('Overall feedback for Web Development course Q1 2024', NOW(), NOW(), 3),
  ('Mid-term review feedback for Mathematics 101',        NOW(), NOW(), 3);

-- Link feedbacks to courses
INSERT INTO `feedback_course` (`feedback_id`, `course_id`) VALUES
  (1, 2),
  (2, 1);

-- Link feedbacks to sections
INSERT INTO `divided_into` (`feedback_id`, `section_id`) VALUES
  (1, 1), (1, 2), (1, 3),
  (2, 1), (2, 2);

-- Sample responses
INSERT INTO `responses` (`description`, `question_id`, `user_id`) VALUES
  ('Very clear, each topic was introduced progressively.',  1, 3),
  ('Yes, all objectives were covered by mid-term.',        2, 3),
  ('Hands-on labs were very helpful.',                     3, 3),
  ('Some concepts needed more examples.',                  4, 3);

-- Sample comments
INSERT INTO `comments` (`description`, `feedback_id`, `user_id`) VALUES
  ('Great feedback, thank you!',           1, 2),
  ('We will address this in next session.', 1, 2);

-- Manage: teacher manages both feedbacks
INSERT INTO `manage` (`user_id`, `feedback_id`) VALUES
  (2, 1),
  (2, 2);
