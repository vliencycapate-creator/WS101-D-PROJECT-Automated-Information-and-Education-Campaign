package com.example.backend_gradle.iec_server.services;

import com.example.backend_gradle.iec_server.entities.Flyer;
import com.example.backend_gradle.iec_server.entities.Record;
import com.example.backend_gradle.iec_server.exceptions.ApiAssert;
import com.example.backend_gradle.iec_server.repositories.RecordJpaRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RecordService {

    private final RecordJpaRepository recordRepo;

    public Record getRecordById(long id) {
        var record = this.recordRepo.findById(id).orElse(null);
        ApiAssert.notFoundIf(record == null, "Record not found with id:" + id);
        return record;
    }

    @Transactional
    public Record postRecord(Flyer flyer, String email) {
        Record record = new Record();
        record.setFlyer_id(flyer.getId());
        record.setEmail(email);
        return this.recordRepo.save(record);
    }

    @Transactional
    public void updateRecordByFlyerId(Flyer flyer, String status) {
        var record = this.getRecordById(flyer.getRecord().getId());
        if (status.equalsIgnoreCase("deleted")) {
            record.setFlyer(null);
        } else {
            record.setFlyer(flyer);
        }
        record.setStatus(status);
        this.recordRepo.save(record);
    }

}
