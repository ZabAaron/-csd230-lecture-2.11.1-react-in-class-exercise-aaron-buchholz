// src/main/java/csd230/seeder/DataSeeder.java
package csd230.seeder;

import csd230.entities.*;
import csd230.repositories.*;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final LaptopRepository laptopRepository;
    private final PhoneRepository phoneRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Faker faker;

    public DataSeeder(BookRepository bookRepository, MagazineRepository magazineRepository,
                      LaptopRepository laptopRepository, PhoneRepository phoneRepository,
                      UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.laptopRepository = laptopRepository;
        this.phoneRepository = phoneRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.faker = new Faker();
    }

    @Override
    public void run(String... args) throws Exception {
        if (bookRepository.count() == 0) {
            seedBooks();
            seedMagazines();
            seedLaptops();
            seedPhones();
        }
        if (userRepository.count() == 0) {
            seedUsers();
        }
    }

    private void seedUsers() {
        UserEntity admin = new UserEntity("admin", passwordEncoder.encode("admin"), "ADMIN");
        userRepository.save(admin);
        UserEntity user = new UserEntity("user", passwordEncoder.encode("user"), "USER");
        userRepository.save(user);
    }

    private void seedBooks() {
        for (int i = 0; i < 10; i++) {
            BookEntity book = new BookEntity(
                    faker.book().title(),
                    faker.number().randomDouble(2, 10, 100),
                    faker.number().numberBetween(1, 50),
                    faker.book().author()
            );
            bookRepository.save(book);
        }
    }

    private void seedMagazines() {
        for (int i = 0; i < 5; i++) {
            LocalDateTime issueDate = faker.date().past(365, TimeUnit.DAYS)
                    .toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            MagazineEntity mag = new MagazineEntity(
                    faker.book().publisher() + " Weekly",
                    faker.number().randomDouble(2, 5, 20),
                    faker.number().numberBetween(10, 100),
                    faker.number().numberBetween(100, 500),
                    issueDate
            );
            magazineRepository.save(mag);
        }
    }

    private void seedLaptops() {
        String[] brands = {"Apple", "Dell", "HP", "Lenovo", "Asus"};
        String[] processors = {"Intel i5", "Intel i7", "Intel i9", "AMD Ryzen 5", "AMD Ryzen 7", "Apple M1", "Apple M2"};
        for (int i = 0; i < 5; i++) {
            LaptopEntity laptop = new LaptopEntity(
                    brands[faker.number().numberBetween(0, brands.length)],
                    faker.number().randomDouble(2, 500, 2500),
                    faker.number().numberBetween(5, 30),
                    processors[faker.number().numberBetween(0, processors.length)]
            );
            laptopRepository.save(laptop);
        }
    }

    private void seedPhones() {
        String[] brands = {"Apple", "Samsung", "Google", "OnePlus", "Xiaomi"};
        Integer[] storageOptions = {64, 128, 256, 512, 1024};
        for (int i = 0; i < 5; i++) {
            PhoneEntity phone = new PhoneEntity(
                    brands[faker.number().numberBetween(0, brands.length)],
                    faker.number().randomDouble(2, 300, 1200),
                    faker.number().numberBetween(10, 50),
                    storageOptions[faker.number().numberBetween(0, storageOptions.length)]
            );
            phoneRepository.save(phone);
        }
    }
}